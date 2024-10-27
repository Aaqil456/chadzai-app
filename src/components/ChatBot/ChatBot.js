import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs';
import './ChatBot.css';

function ChatBot() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null); // For storing the uploaded image
  const [response, setResponse] = useState('');

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
    "scale": {
      name: "Treadmill",
      usage: "Used for walking, running, or jogging to improve cardiovascular fitness.",
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

    try {
      const model = await mobilenet.load(); // Load MobileNet model

      // Create a temporary image element for scanning
      const imgElement = document.createElement('img');
      imgElement.src = image;

      imgElement.onload = async () => {
        // Wait for the image to load
        const predictions = await model.classify(imgElement);

        if (predictions.length > 0) {
          const prediction = predictions[0].className.trim().toLowerCase();
          console.log("Normalized Prediction: ", prediction); // Log the normalized prediction

          // Check if any key in machineInfo exists in the prediction string
          const matchedMachine = Object.keys(machineInfo).find(machineKey => prediction.includes(machineKey));

          if (matchedMachine) {
            setResponse(`Machine: ${machineInfo[matchedMachine].name}. Usage: ${machineInfo[matchedMachine].usage}`);
          } else {
            setResponse(`Machine recognized, but no details are available. This is the : "${prediction}"`);          }
        } else {
          setResponse("Machine not recognized.");
        }
      };

      imgElement.onerror = () => {
        setResponse("Error loading the image for scanning.");
      };
    } catch (error) {
      setResponse("Error recognizing image: " + error.message);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-content">
        <h2>AI Assistant</h2>
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
          <button type="submit" className="chatbot-submit">Scan Machine</button>
        </form>

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
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatBot;
