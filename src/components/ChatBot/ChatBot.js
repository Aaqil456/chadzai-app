import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatBot.css';

function ChatBot() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null); // For storing the uploaded image
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add this new state

  const machineInfo = {
    "barbell": {
      name: "Barbell",
      usage: "Used for weightlifting exercises such as squats, bench presses, and deadlifts.",
    },
    "screwdriver": {
      name: "Barbell",
      usage: "Used for weightlifting exercises such as squats, bench presses, and deadlifts.",
    },
    "treadmill": {
      name: "Treadmill",
      usage: "Used for walking, running, or jogging to improve cardiovascular fitness.",
    },
    "bench": {
      name: "Smith Machine",
      usage: "Used as a support for any major movements such as squatting, deadlifting or bench pressing.",
      tutorial:"Adjust the height of the bar so it’s in a comfortable position for the exercise you’re performing. Before lifting heavy weights, do a warm-up set with a lighter load. This helps you get familiar with the machine’s movement and warms up your muscles",
    },
    // Add more machine mappings as needed
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Store the image as data URL
      };
      reader.readAsDataURL(file); // Convert image to data URL
    }
  };

  const handleImageScan = async (e) => {
    e.preventDefault();
    if (!image) {
      setResponse("Please upload an image of a gym machine.");
      return;
    }

    setIsLoading(true); // Start loading
    try {
      // Convert base64 image to blob
      const base64Response = await fetch(image);
      const blob = await base64Response.blob();

      // Send to Hugging Face API
      const response = await fetch(
        "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large",
        {
          headers: {
            Authorization: "Bearer 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",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: blob,
        }
      );

      const result = await response.json();
      const prediction = result[0].generated_text.toLowerCase();
      console.log("Prediction:", prediction);

      // Check if any key in machineInfo exists in the prediction string
      const matchedMachine = Object.keys(machineInfo).find(machineKey => 
        prediction.includes(machineKey)
      );

      if (matchedMachine) {
        setResponse(`
          <table class="info-table">
            <tr>
              <th>Machine</th>
              <td>${machineInfo[matchedMachine].name}</td>
            </tr>
            <tr>
              <th>Usage</th>
              <td>${machineInfo[matchedMachine].usage}</td>
            </tr>
            <tr>
              <th>How To Use</th>
              <td>${machineInfo[matchedMachine].tutorial || 'Not available'}</td>
            </tr>
          </table>
        `);
      } else {
        setResponse(`Machine recognized, but no details are available. Description: "${prediction}"`);
      }
    } catch (error) {
      setResponse("Error recognizing image: " + error.message);
    } finally {
      setIsLoading(false); // Stop loading regardless of success/failure
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-content">
        <h2>Ask AI</h2>
        <button onClick={() => navigate('/main-menu')} className="back-button">
          Back to Main Menu
        </button>
        <form onSubmit={handleImageScan} className="chatbot-form">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="chatbot-file-input"
          />
          <button type="submit" className="chatbot-submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Scan Machine'}
          </button>
        </form>

        {/* Add loading indicator */}
        {isLoading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Analyzing image...</p>
          </div>
        )}

        {/* Show the uploaded image as a preview */}
        {image && (
          <div className="image-preview">
            <h3>Uploaded Image:</h3>
            <img id="uploadedImage" src={image} alt="Uploaded" />
          </div>
        )}

        {/* Display the response */}
        {response && (
          <div className="chatbot-response">
            <h3>Response:</h3>
            <div dangerouslySetInnerHTML={{ __html: response }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatBot;
