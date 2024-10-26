// src/components/Navbar/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth'; // Import signOut
import { auth } from '../../services/firebase'; // Import auth
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/main-menu">Home</Link>
        </li>
        <li>
          <Link to="/chatbot">ChatBot</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
