import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainMenu.css';

function MainMenu() {
  const navigate = useNavigate();
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  
  useEffect(() => {
    const workouts = JSON.parse(localStorage.getItem('savedWorkouts') || '[]');
    setSavedWorkouts(workouts);
  }, []);

  const handleDeleteWorkout = (id) => {
    const updatedWorkouts = savedWorkouts.filter(workout => workout.id !== id);
    localStorage.setItem('savedWorkouts', JSON.stringify(updatedWorkouts));
    setSavedWorkouts(updatedWorkouts);
    setSelectedWorkout(null);
  };

  const handleViewWorkout = (workout) => {
    setSelectedWorkout(selectedWorkout?.id === workout.id ? null : workout);
  };

  return (
    <div className="main-menu-container">
      <h1>Welcome to Your Fitness Dashboard</h1>
      <div className="button-container">
        <button 
          className="chatbot-button"
          onClick={() => navigate('/chatbot')}
        >
          Open ChatBot
        </button>
        <button 
          className="find-workouts-button"
          onClick={() => navigate('/workoutplan')}
        >
          Find My Workouts
        </button>
      </div>

      {savedWorkouts.length > 0 && (
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
                    onClick={() => handleDeleteWorkout(workout.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
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
