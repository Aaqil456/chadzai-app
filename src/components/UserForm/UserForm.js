import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../services/firebase';
import { doc, setDoc } from 'firebase/firestore';
import './UserForm.css';

function UserForm() {
  const [name, setName] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      await setDoc(doc(db, 'users', user.uid), {
        name,
        height,
        weight
      });
      navigate('/main-menu');
    } else {
      console.error('No user is signed in');
      // Handle the case where no user is signed in
      // You might want to redirect to the sign-in page
      navigate('/signin');
    }
  };

  return (
    <div className="user-form-container">
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Height (cm)"
          required
        />
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Weight (kg)"
          required
        />
       
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default UserForm;