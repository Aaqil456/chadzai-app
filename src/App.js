// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import SignIn from './components/SignIn/SignIn';
import UserForm from './components/UserForm/UserForm';
import MainMenu from './components/MainMenu/MainMenu';
import Navbar from './components/Navbar/Navbar'; // Import Navbar

import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        {user && <Navbar />} {/* Render Navbar if user is logged in */}
        <Routes>
          <Route path="/signin" element={!user ? <SignIn /> : <Navigate to="/main-menu" />} />
          <Route path="/user-form" element={user ? <UserForm /> : <Navigate to="/signin" />} />
          <Route path="/main-menu" element={user ? <MainMenu /> : <Navigate to="/signin" />} />
          <Route path="*" element={<Navigate to={user ? "/main-menu" : "/signin"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;