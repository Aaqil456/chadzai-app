import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './WorkoutChat.css';

function WorkoutChat() {
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
    script.async = true;
    script.onload = function() {
      window.voiceflow.chat.load({
        verify: { projectID: '66f42770011c56b5632835b6' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
        container: chatContainerRef.current,
        launcher: { open: true },
        styles: {
          width: '100%',
          height: '100%',
          border: 'none',
          borderRadius: '10px',
        }
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="workout-chat-container">
      <h1>Find My Workouts</h1>
      <button onClick={() => navigate('/main-menu')} className="back-button">
        Back to Main Menu
      </button>
      <div ref={chatContainerRef} className="chat-container"></div>
    </div>
  );
}

export default WorkoutChat;
