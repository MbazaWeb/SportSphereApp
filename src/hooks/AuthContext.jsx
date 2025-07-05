// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../firebase/firebaseConfig'; // Import your firebase config
import { onAuthStateChangedListener, getUserProfile, createUserProfile, signInUserAnonymously, signInWithCustomAuthToken } from '../firebase/firebaseService'; // Import auth services

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [auth, setAuth] = useState(null);
    const [db, setDb] = useState(null);

    // Global variables for Firebase config and app ID (if not already defined elsewhere)
    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
    const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

    useEffect(() => {
        const app = initializeApp(firebaseConfig);
        const firebaseAuth = getAuth(app);
        const firestore = getFirestore(app);

        setAuth(firebaseAuth);
        setDb(firestore);

        const unsubscribe = onAuthStateChangedListener(firebaseAuth, async (user) => {
            if (user) {
                setCurrentUser(user);
                setUserId(user.uid);
                setIsLoggedIn(true);

                // Try to fetch user profile, create if it doesn't exist
                let userProfile = await getUserProfile(firestore, appId, user.uid);
                if (!userProfile) {
                    // Create a default profile if none exists
                    const defaultProfile = {
                        id: user.uid,
                        user: 'New SportSphere User',
                        avatar: 'https://placehold.co/32x32/22C55E/FFFFFF?text=S',
                        verificationTier: 'fan',
                        cover: 'https://placehold.co/1200x400/22C55E/FFFFFF?text=My+SportSphere+Cover',
                        bio: 'Welcome to SportSphere!',
                        joined: new Date().toISOString(),
                        location: 'Global',
                        website: '',
                        stats: { posts: '0', followers: '0', following: '0' },
                        role: 'fan',
                        interactions: 0
                    };
                    await createUserProfile(firestore, appId, user.uid, defaultProfile);
                    userProfile = defaultProfile; // Set the newly created profile
                }
                // You might want to update your global usersData state here if it's managed externally
                // For simplicity in this context, we're just setting current user/userId
            } else {
                // Sign in anonymously if no user is logged in or token is not provided
                try {
                    if (initialAuthToken) {
                        await signInWithCustomAuthToken(firebaseAuth, initialAuthToken);
                    } else {
                        await signInUserAnonymously(firebaseAuth);
                    }
                } catch (anonError) {
                    console.error("Error signing in anonymously via AuthContext:", anonError);
                    // Handle error, e.g., show a message or redirect to a public page
                }
                setCurrentUser(firebaseAuth.currentUser || null);
                setUserId(firebaseAuth.currentUser?.uid || null);
                setIsLoggedIn(!!firebaseAuth.currentUser);
            }
            setIsAuthReady(true);
        });

        return () => unsubscribe();
    }, [appId, initialAuthToken]); // Dependencies for useEffect

    // You can add more functions here for login with email/password, signOut, etc.
    // For now, these are derived from the initial App.js logic.

    const value = {
        currentUser,
        userId,
        isLoggedIn,
        isAuthReady,
        auth, // Provide auth instance for direct Firebase SDK usage if needed
        db,   // Provide db instance for direct Firebase SDK usage if needed
        // signIn,
        // signOut,
        // signUp,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};