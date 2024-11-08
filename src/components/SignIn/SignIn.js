// src/components/SignIn/SignIn.js
import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, db } from '../../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import logo from '../../assets/2.png';
import landingImg from '../../assets/land_page_gym_img.jpg';
import './SignIn.css';


function SignIn() {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // Check if user profile exists
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      
      if (userDoc.exists()) {
        // User profile exists, redirect to main menu
        navigate('/main-menu');
      } else {
        // New user, redirect to user form
        //navigate('/user-form');
        navigate('/main-menu');
      }
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  return (
    <div className="signin-container">
      <img src={logo} alt="Logo" />
      <div className="hero-image">
      <img src={landingImg} alt="LandingImg" />
      </div>
      <h2>Welcome to modern AI-powered Fitness Web App</h2>
      <button className="signin-button" onClick={signInWithGoogle}>
        Be A Chad
      </button>
    </div>
  );
}

export default SignIn;