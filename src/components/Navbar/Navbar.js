// src/components/Navbar/Navbar.js
import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
//import { useNavigate, useLocation } from 'react-router-dom';

//import { Link } from 'react-router-dom';

import { signOut } from 'firebase/auth'; // Import signOut
import { auth } from '../../services/firebase'; // Import auth
import logo from '../../assets/navbar_icon.png';
import twitterIcon from '../../assets/twitter_icon.svg';
import instagramIcon from '../../assets/instagram_icon.svg';
import './Navbar.css';


const Navbar = () => {
  const navigate = useNavigate();
  //const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isSignInPage = window.location.pathname === '/signin';

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
      
      <div className="navbar-right">
        <div className="social-icons">
          <a href="https://x.com/aa_fit62899" target="_blank" rel="noopener noreferrer">
            <img src={twitterIcon} alt="Twitter" />
          </a>
          <a href="https://www.instagram.com/chadz_ai/" target="_blank" rel="noopener noreferrer">
            <img src={instagramIcon} alt="Instagram" />
          </a>
        </div>
        
        {!isSignInPage && (
          <div className="hamburger" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>

      {!isSignInPage && (
        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
