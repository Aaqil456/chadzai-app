import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../../data/questions';
import { workoutPlans } from '../../data/workoutPlans';
import { determineWorkoutPlan } from '../../utils/workoutUtils';
import './WorkoutChat.css';
import { auth, db } from '../../services/firebase';
import { addDoc, collection } from 'firebase/firestore';

function WorkoutChat() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showWorkoutPlan, setShowWorkoutPlan] = useState(false);

  const handleAnswer = (answer) => {
    const newAnswers = { ...answers };
    
    switch(currentQuestion) {
      case 0:
        newAnswers.goal = answer;
        break;
      case 1:
        newAnswers.skill = answer;
        break;
      case 2:
        newAnswers.style = answer;
        break;
      default:
        break;
    }
    
    setAnswers(newAnswers);

    if (currentQuestion === questions.length - 1 || 
        (newAnswers.goal === "Build Muscle" && currentQuestion === 2) ||
        (newAnswers.goal === "Calisthenics Skills" && currentQuestion === 1)) {
      setShowWorkoutPlan(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const getCurrentQuestion = () => {
    const question = questions[currentQuestion];
    if (question.conditional && !question.conditional(answers)) {
      handleAnswer(null);
      return null;
    }
    return question;
  };

  const question = getCurrentQuestion();

  const handleSaveWorkout = async () => {
    const workoutPlan = determineWorkoutPlan(answers, workoutPlans);
    const user = auth.currentUser;
    
    if (!user) {
      alert('Please sign in to save your workout plan');
      return;
    }

    const newWorkout = {
      userId: user.uid,
      id: Date.now(),
      type: answers.goal === "Build Muscle" ? answers.style : answers.skill,
      plan: workoutPlan,
      date: new Date().toLocaleDateString()
    };
    
    try {
      console.log('Attempting to save workout:', newWorkout);
      const docRef = await addDoc(collection(db, 'workouts'), newWorkout);
      console.log('Workout saved successfully with ID:', docRef.id);
      navigate('/');
    } catch (error) {
      console.error('Detailed error saving workout:', {
        error: error,
        errorMessage: error.message,
        errorCode: error.code,
        user: user.uid
      });
      alert(`Failed to save workout plan: ${error.message}`);
    }
  };

  return (
    <div className="workout-chat">
      {!showWorkoutPlan ? (
        question && (
          <div className="question-container">
            <h2>{question.text}</h2>
            <div className="options-container">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="option-button"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )
      ) : (
        <div className="workout-plan-container">
          <div dangerouslySetInnerHTML={{ 
            __html: determineWorkoutPlan(answers, workoutPlans) 
          }} />
          <button 
            className="save-workout-button"
            onClick={handleSaveWorkout}
          >
            Save Workout Plan
          </button>
        </div>
      )}
    </div>
  );
}

export default WorkoutChat;



