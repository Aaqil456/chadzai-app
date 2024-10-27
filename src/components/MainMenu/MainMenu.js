import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainMenu.css';

function MainMenu() {
  const navigate = useNavigate();

  return (
    <div className="main-menu-container">
      <h1>Welcome to Your Fitness Dashboard</h1>
      <button 
        className="chatbot-button"
        onClick={() => navigate('/chatbot')}
      >
        Open ChatBot
      </button>
      <button 
        className="find-workouts-button"
        onClick={() => navigate('/workout-chat')}
      >
        Find My Workouts
      </button>
    </div>
  );
}

export default MainMenu;
