import React, { useState } from 'react';
import ChatBot from '../ChatBot/ChatBot';
import './MainMenu.css';

function MainMenu() {
  const [showChatBot, setShowChatBot] = useState(false);

  return (
    <div className="main-menu-container">
      <h1>Welcome to Your Fitness Dashboard</h1>
      <button 
        className="chatbot-button"
        onClick={() => setShowChatBot(!showChatBot)}
      >
        {showChatBot ? 'Close ChatBot' : 'Open ChatBot'}
      </button>
      {showChatBot && <ChatBot />}
    </div>
  );
}

export default MainMenu;