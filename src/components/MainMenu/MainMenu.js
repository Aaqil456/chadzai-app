import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainMenu.css';

function MainMenu() {
  const navigate = useNavigate();
  const [showVoiceflow, setShowVoiceflow] = useState(false);

  useEffect(() => {
    if (showVoiceflow) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.onload = function() {
        window.voiceflow.chat.load({
          verify: { projectID: '66f42770011c56b5632835b6' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production',
          render: {
            mode: 'overlay',
            overlay: {
              button: { visible: false },
              launcher: { visible: false },
              modal: { 
                autoOpen: true,
                fullscreen: false,
              },
            },
          },
        });
      };
      script.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
        // Clean up Voiceflow chat
        if (window.voiceflow && window.voiceflow.chat) {
          window.voiceflow.chat.destroy();
        }
      };
    }
  }, [showVoiceflow]);

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
        onClick={() => setShowVoiceflow(true)}
      >
        Find My Workouts
      </button>
    </div>
  );
}

export default MainMenu;
