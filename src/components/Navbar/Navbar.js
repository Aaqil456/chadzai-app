// src/components/Navbar/Navbar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { Link } from 'react-router-dom';

import { signOut } from 'firebase/auth'; // Import signOut
import { auth } from '../../services/firebase'; // Import auth
import logo from '../../assets/navbar_icon.png';
import twitterIcon from '../../assets/twitter_icon.svg';
import instagramIcon from '../../assets/instagram_icon.svg';
import './Navbar.css';


const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <div className="social-icons">
          <a href="https://twitter.com/your-profile" target="_blank" rel="noopener noreferrer">
            <img src={twitterIcon} alt="Twitter" />
          </a>
          <a href="https://instagram.com/your-profile" target="_blank" rel="noopener noreferrer">
            <img src={instagramIcon} alt="Instagram" />
          </a>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
