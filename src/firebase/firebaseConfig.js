// src/firebase/firebaseConfig.js
// This file contains your Firebase project's configuration.
// IMPORTANT: DO NOT expose your actual Firebase config in a public repository.
// For a real application, these values should be loaded from environment variables
// or a secure server-side configuration.

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID" // Optional, if you're using Google Analytics
};

export default firebaseConfig;