// src/firebase/firebaseService.js
import { collection, doc, getDoc, addDoc, setDoc, updateDoc, onSnapshot, query, where, getDocs } from 'firebase/firestore';
import { signInAnonymously, signInWithCustomToken, onAuthStateChanged as firebaseOnAuthStateChanged } from 'firebase/auth';

// --- Auth Services ---

export const signInUserAnonymously = async (auth) => {
    try {
        const userCredential = await signInAnonymously(auth);
        return userCredential.user;
    } catch (error) {
        console.error("Error signing in anonymously:", error);
        throw error;
    }
};

export const signInWithCustomAuthToken = async (auth, token) => {
    try {
        const userCredential = await signInWithCustomToken(auth, token);
        return userCredential.user;
    } catch (error) {
        console.error("Error signing in with custom token:", error);
        throw error;
    }
};

export const onAuthStateChangedListener = (auth, callback) => {
    return firebaseOnAuthStateChanged(auth, callback);
};

// --- User Profile Services ---

export const getUserProfile = async (db, appId, userId) => {
    [cite_start]const userDocRef = doc(db, `/artifacts/${appId}/users`, userId); [cite: 6]
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
        return { id: userDocSnap.id, ...userDocSnap.data() };
    }
    return null;
};

export const createUserProfile = async (db, appId, userId, profileData) => {
    [cite_start]const userDocRef = doc(db, `/artifacts/${appId}/users`, userId); [cite: 6]
    await setDoc(userDocRef, profileData);
    return profileData;
};

export const updateUserProfile = async (db, appId, userId, updatedData) => {
    [cite_start]const userDocRef = doc(db, `/artifacts/${appId}/users`, userId); [cite: 6]
    await updateDoc(userDocRef, updatedData);
};

export const streamAllUsers = (db, appId, callback) => {
    [cite_start]const usersColRef = collection(db, `/artifacts/${appId}/users`); [cite: 7]
    const unsubscribe = onSnapshot(usersColRef, (snapshot) => {
        const fetchedUsers = {};
        snapshot.docs.forEach(doc => {
            fetchedUsers[doc.id] = { id: doc.id, ...doc.data() };
        });
        callback(fetchedUsers);
    }, (error) => {
        console.error("Error streaming all users:", error);
    });
    return unsubscribe;
};

// --- Post Services ---

export const addPost = async (db, appId, postData) => {
    [cite_start]const postsRef = collection(db, `/artifacts/${appId}/public/data/posts`); [cite: 5]
    const docRef = await addDoc(postsRef, postData);
    return { id: docRef.id, ...postData };
};

export const updatePost = async (db, appId, postId, updatedData) => {
    [cite_start]const postRef = doc(db, `/artifacts/${appId}/public/data/posts`, postId); [cite: 5]
    await updateDoc(postRef, updatedData);
};

export const streamPosts = (db, appId, callback) => {
    [cite_start]const postsColRef = collection(db, `/artifacts/${appId}/public/data/posts`); [cite: 5]
    const q = query(postsColRef); // You might add orderBy('time', 'desc') here for sorting
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedPosts = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        fetchedPosts.sort((a, b) => new Date(b.time) - new Date(a.time)); // Sort by time (newest first)
        callback(fetchedPosts);
    }, (error) => {
        console.error("Error streaming posts:", error);
    });
    return unsubscribe;
};

// --- Comment Services ---

export const addCommentToPost = async (db, appId, postId, commentData) => {
    [cite_start]const commentsRef = collection(db, `/artifacts/${appId}/public/data/posts/${postId}/comments`); [cite: 5]
    const docRef = await addDoc(commentsRef, commentData);
    return { id: docRef.id, ...commentData };
};

export const streamPostComments = (db, appId, postId, callback) => {
    [cite_start]const commentsRef = collection(db, `/artifacts/${appId}/public/data/posts/${postId}/comments`); [cite: 5]
    const q = query(commentsRef); // Consider adding orderBy('timestamp')
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedComments = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        fetchedComments.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        callback(fetchedComments);
    }, (error) => {
        console.error("Error streaming comments:", error);
    });
    return unsubscribe;
};

// --- Channel Message Services (ProZone) ---

export const addChannelMessage = async (db, appId, messageData) => {
    [cite_start]const channelMessagesRef = collection(db, `/artifacts/${appId}/public/data/channelMessages`); [cite: 5]
    const docRef = await addDoc(channelMessagesRef, messageData);
    return { id: docRef.id, ...messageData };
};

export const streamChannelMessages = (db, appId, callback) => {
    [cite_start]const channelMessagesRef = collection(db, `/artifacts/${appId}/public/data/channelMessages`); [cite: 5]
    const q = query(channelMessagesRef); // Consider adding orderBy('timestamp')
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedMessages = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        fetchedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        callback(fetchedMessages);
    }, (error) => {
        console.error("Error streaming channel messages:", error);
    });
    return unsubscribe;
};

// --- Order Services ---

export const addOrder = async (db, appId, userId, orderData) => {
    [cite_start]const ordersRef = collection(db, `/artifacts/${appId}/users/${userId}/orders`); [cite: 6]
    await setDoc(doc(ordersRef, orderData.id), orderData); // Use setDoc with explicit ID
};

export const streamUserOrders = (db, appId, userId, callback) => {
    [cite_start]const ordersColRef = collection(db, `/artifacts/${appId}/users/${userId}/orders`); [cite: 6]
    const q = query(ordersColRef); // Consider adding orderBy('date', 'desc')
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedOrders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        fetchedOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
        callback(fetchedOrders);
    }, (error) => {
        console.error("Error streaming user orders:", error);
    });
    return unsubscribe;
};