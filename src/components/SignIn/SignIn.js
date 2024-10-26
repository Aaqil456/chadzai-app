// src/components/SignIn/SignIn.js

import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../../services/firebase';
import './SignIn.css';

function SignIn() {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/user-form');
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  return (
    <div className="signin-container">
      <h1>Welcome to Fitness App</h1>
      <button className="signin-button" onClick={signInWithGoogle}>
        Sign In with Google
      </button>
    </div>
  );
}

export default SignIn;