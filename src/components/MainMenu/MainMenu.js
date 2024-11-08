import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainMenu.css';
import { auth, db } from '../../services/firebase';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';

function MainMenu() {
  const navigate = useNavigate();
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchWorkouts = async () => {
      const user = auth.currentUser;
      if (!user) {
        setSavedWorkouts([]);
        setLoading(false);
        return;
      }

      try {
        const workoutsQuery = query(
          collection(db, 'workouts'),
          where('userId', '==', user.uid)
        );
        
        const querySnapshot = await getDocs(workoutsQuery);
        const workouts = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          firestoreId: doc.id // Save Firestore document ID for deletion
        }));
        
        setSavedWorkouts(workouts);
      } catch (error) {
        console.error('Error fetching workouts:', error);
        alert('Failed to load workout plans');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const handleDeleteWorkout = async (id, firestoreId) => {
    try {
      await deleteDoc(doc(db, 'workouts', firestoreId));
      const updatedWorkouts = savedWorkouts.filter(workout => workout.id !== id);
      setSavedWorkouts(updatedWorkouts);
      setSelectedWorkout(null);
    } catch (error) {
      console.error('Error deleting workout:', error);
      alert('Failed to delete workout plan');
    }
  };

  const handleViewWorkout = (workout) => {
    setSelectedWorkout(selectedWorkout?.id === workout.id ? null : workout);
  };

  return (
    <div className="main-menu-container">
      <h1>Welcome to Your AI Fitness Dashboard</h1>
      <div className="button-container">
        <button 
          className="chatbot-button"
          onClick={() => navigate('/')}
        >
          AI Image Recognition
        </button>
        <button 
          className="find-workouts-button"
          onClick={() => navigate('/')}
        >
          AI Workout Planner
        </button>
        <h2>Coming Soon</h2>
      </div>

      {loading ? (
        <p>Loading workout plans...</p>
      ) : (
        savedWorkouts.length > 0 && (
          <div className="saved-workouts-container">
            <h2>Your Saved Workout Plans</h2>
            <div className="workout-cards">
              {savedWorkouts.map(workout => (
                <div key={workout.id} className="workout-card">
                  <h3>{workout.type}</h3>
                  <p>Saved on: {workout.date}</p>
                  <div className="workout-card-buttons">
                    <button 
                      onClick={() => handleViewWorkout(workout)}
                      className="view-button"
                    >
                      {selectedWorkout?.id === workout.id ? 'Hide Plan' : 'View Plan'}
                    </button>
                    <button 
                      onClick={() => handleDeleteWorkout(workout.id, workout.firestoreId)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      )}

      {/* Workout Plan Display Section - Outside of saved-workouts-container */}
      {selectedWorkout && (
        <div className="workout-plan-section">
          <div className="workout-plan-display">
            <h2>{selectedWorkout.type} Workout Plan</h2>
            <div dangerouslySetInnerHTML={{ __html: selectedWorkout.plan }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default MainMenu;
