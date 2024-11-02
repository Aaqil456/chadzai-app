// src/services/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCDo__XNy0TVm0YfW8SLZ24GwmO6ncchYM",
    authDomain: "chadz-ai-web-app.firebaseapp.com",
    projectId: "chadz-ai-web-app",
    storageBucket: "chadz-ai-web-app.appspot.com",
    messagingSenderId: "222290917391",
    appId: "1:222290917391:web:8f19e68a3c09084b850b7a",
    measurementId: "G-S5VG7TKMYW"
};

let app;
let auth;
let db;
let googleProvider;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  googleProvider = new GoogleAuthProvider();
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error("Detailed Firebase initialization error:", error);
}

export { auth, db, googleProvider };