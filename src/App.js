import React, { useState, useEffect, useCallback } from 'react';
import {
    Mail, Bell, Twitter, Instagram, Facebook, Video, Search, Plus, MessageSquare, Share2, MoreHorizontal, Menu, Shield, Trophy, Users, Heart, Bookmark, Linkedin, Briefcase, X, ChevronLeft, ChevronRight, Radio, BarChart3, TrendingUp, TrendingDown, Star, Mic, UserCheck, Flag, Clipboard, ArrowLeft, Calendar as CalendarIcon, Link as LinkIcon, MapPin, ThumbsUp, ThumbsDown, Image, ListTodo, Film, Zap, Play, Music, ShoppingCart, Award, Send, Lock, User, Phone, MailOpen, KeyRound, Edit
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, addDoc, setDoc, updateDoc, onSnapshot, collection, query, where, getDocs } from 'firebase/firestore';

// Import components
import MessageBox from './components/common/MessageBox';
import VerifiedBadge from './components/badges/VerifiedBadge';
import FanBadge from './components/badges/FanBadge';
import PlatformIcon from './components/common/PlatformIcon';
import Comment from './components/posts/Comment';
import CommentSection from './components/posts/CommentSection';
import PostCard from './components/posts/PostCard';
import VideoTypeBadge from './components/videos/VideoTypeBadge';
import VideoCard from './components/videos/VideoCard';
import HighlightsHub from './pages/Highlights';
import ProContentCard from './components/prozone/ProContentCard'; // Assuming you'll create this
import ChannelMessageCard from './components/prozone/ChannelMessageCard'; // Assuming you'll create this
import ProZone from './pages/ProZone';
import LiveGameCard from './components/live/LiveGameCard';
import LiveBettingCard from './components/live/LiveBettingCard';
import MatchStatsModal from './components/live/MatchStatsModal';
import NewPostModal from './components/posts/NewPostModal';
import LiveTab from './pages/Live';
import LiveMatchScreen from './components/live/LiveMatchScreen';
import LiveBettingModal from './components/live/LiveBettingModal';
import ShopProductCard from './components/shop/ShopProductCard';
import ShopModal from './components/shop/ShopModal';
import OnlineShop from './pages/OnlineShopPage';
import PaymentModal from './components/shop/PaymentModal';
import OrdersPage from './components/shop/OrdersPage';
import Story from './components/stories/Story';
import StoriesTray from './components/stories/StoriesTray';
import SportsFeed from './pages/Feed';
import MessageItem from './components/messaging/MessageItem';
import Messaging from './pages/Messaging';
import ProfilePage from './components/user/ProfilePage';
import LoginPage from './pages/LoginPage';
import StoryViewer from './components/stories/StoryViewer';
import EditProfileModal from './components/user/EditProfileModal';
import NavItem from './components/layout/NavItem';

// Import mock data and utility functions
import { initialMockUsers, mockStories, mockVideos, initialLiveGames, mockLiveBets, shopTeams, shopMatches, shopProducts, azamTvData, bestOffers } from './data/mockData';
import { verificationTiers } from './data/verificationTiers';
import { formatTimeAgo, formatOdds } from './utils/formatters';


export default function App() {
    // Firebase state
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false); // To ensure Firebase is initialized and auth state is known

    // App state
    const [activeTab, setActiveTab] = useState('Feed');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [storyViewerState, setStoryViewerState] = useState({ isOpen: false, activeIndex: null });
    const [viewingProfile, setViewingProfile] = useState(null);
    const [editingProfile, setEditingProfile] = useState(null);
    const [usersData, setUsersData] = useState({}); // Will be populated from Firestore
    const [posts, setPosts] = useState([]); // Will be populated from Firestore
    const [viewingGameStats, setViewingGameStats] = useState(null);
    const [viewingLiveBetting, setViewingLiveBetting] = useState(null);
    const [followedUsers, setFollowedUsers] = useState(new Set());
    const [showNewPostModal, setShowNewPostModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [purchaseHistory, setPurchaseHistory] = useState([]);

    // State for MessageBox
    const [messageBox, setMessageBox] = useState({ show: false, message: '', type: '' });

    // Global variables for Firebase config and app ID
    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
    const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
    const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

    // Initialize Firebase and set up auth listener
    useEffect(() => {
        try {
            const app = initializeApp(firebaseConfig);
            const firestore = getFirestore(app);
            const firebaseAuth = getAuth(app);

            setDb(firestore);
            setAuth(firebaseAuth);

            // Listen for auth state changes
            const unsubscribeAuth = onAuthStateChanged(firebaseAuth, async (user) => {
                if (user) {
                    setUserId(user.uid);
                    setIsLoggedIn(true);
                    // Fetch or create user profile in Firestore
                    const userDocRef = doc(firestore, `/artifacts/${appId}/users`, user.uid);
                    const userDocSnap = await getDoc(userDocRef);

                    if (!userDocSnap.exists()) {
                        // Create a default user profile if it doesn't exist
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
                        await setDoc(userDocRef, defaultProfile);
                        setUsersData(prev => ({ ...prev, [user.uid]: defaultProfile }));
                    } else {
                        setUsersData(prev => ({ ...prev, [user.uid]: userDocSnap.data() }));
                    }
                } else {
                    // Sign in anonymously if no user is logged in or token is not provided
                    try {
                        if (initialAuthToken) {
                            await signInWithCustomToken(firebaseAuth, initialAuthToken);
                        } else {
                            await signInAnonymously(firebaseAuth);
                        }
                    } catch (anonError) {
                        console.error("Error signing in anonymously:", anonError);
                        showAlert("Failed to sign in. Please try again.", "error");
                    }
                    setUserId(firebaseAuth.currentUser?.uid || null);
                    setIsLoggedIn(!!firebaseAuth.currentUser);
                }
                setIsAuthReady(true); // Auth state is now known
            });

            return () => unsubscribeAuth(); // Cleanup auth listener
        } catch (error) {
            console.error("Error initializing Firebase:", error);
            showAlert("Failed to initialize the app. Please try again.", "error");
        }
    }, [appId, firebaseConfig, initialAuthToken]);

    // Fetch all users from Firestore (for displaying other users' profiles)
    useEffect(() => {
        if (!db || !isAuthReady) return;

        const usersColRef = collection(db, `/artifacts/${appId}/users`);
        const unsubscribe = onSnapshot(usersColRef, (snapshot) => {
            const fetchedUsers = {};
            snapshot.docs.forEach(doc => {
                fetchedUsers[doc.id] = { id: doc.id, ...doc.data() };
            });
            setUsersData(prev => ({ ...prev, ...fetchedUsers })); // Merge with existing users (like currentuser)
        }, (error) => {
            console.error("Error fetching users:", error);
        });

        return () => unsubscribe();
    }, [db, isAuthReady, appId]);

    // Fetch posts from Firestore
    useEffect(() => {
        if (!db || !isAuthReady) return;

        const postsColRef = collection(db, `/artifacts/${appId}/public/data/posts`);
        const unsubscribe = onSnapshot(postsColRef, (snapshot) => {
            const fetchedPosts = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            // Sort posts by time (newest first)
            fetchedPosts.sort((a, b) => new Date(b.time) - new Date(a.time));
            setPosts(fetchedPosts);
        }, (error) => {
            console.error("Error fetching posts:", error);
        });

        return () => unsubscribe();
    }, [db, isAuthReady, appId]);

    // Fetch purchase history from Firestore for the current user
    useEffect(() => {
        if (!db || !isAuthReady || !userId) return;

        const ordersColRef = collection(db, `/artifacts/${appId}/users/${userId}/orders`);
        const unsubscribe = onSnapshot(ordersColRef, (snapshot) => {
            const fetchedOrders = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            // Sort orders by date (newest first)
            fetchedOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
            setPurchaseHistory(fetchedOrders);
        }, (error) => {
            console.error("Error fetching purchase history:", error);
        });

        return () => unsubscribe();
    }, [db, isAuthReady, appId, userId]);


    // Function to show custom alert message
    const showAlert = (message, type = 'info') => {
        setMessageBox({ show: true, message, type });
    };

    // Function to close custom alert message
    const closeAlert = () => {
        setMessageBox({ show: false, message: '', type: '' });
    };

    const handleUserClick = (targetUserId) => { setViewingProfile(usersData[targetUserId]); };
    const handleCloseProfile = () => { setViewingProfile(null); };
    const handleEditProfile = (user) => { setEditingProfile(user); };
    const handleCloseEditProfile = () => { setEditingProfile(null); };
    const handleSaveProfile = async (updatedData) => {
        if (!db || !userId) return;
        try {
            const userDocRef = doc(db, `/artifacts/${appId}/users`, userId);
            await updateDoc(userDocRef, updatedData);
            setUsersData(prev => ({ ...prev, [userId]: { ...prev[userId], ...updatedData } }));
            setViewingProfile(prev => ({ ...prev, ...updatedData }));
            showAlert('Profile updated successfully!', 'success');
        } catch (error) {
            console.error("Error saving profile:", error);
            showAlert('Failed to save profile. Please try again.', 'error');
        }
    };

    const handleStoryClick = (index) => { setStoryViewerState({ isOpen: true, activeIndex: index }); };
    const handleCloseStoryViewer = () => { setStoryViewerState({ isOpen: false, activeIndex: null }); };
    const handleNextStory = useCallback(() => {
        setStoryViewerState(prevState => {
            if (prevState.activeIndex === null || prevState.activeIndex >= mockStories.length - 1) {
                return { isOpen: false, activeIndex: null };
            }
            return { ...prevState, activeIndex: prevState.activeIndex + 1 };
        });
    }, [mockStories.length]);

    const handlePrevStory = () => {
        setStoryViewerState(prevState => {
            if (prevState.activeIndex === null || prevState.activeIndex <= 0) {
                return { ...prevState, activeIndex: 0 };
            }
            return { ...prevState, activeIndex: prevState.activeIndex - 1 };
        });
    };

    const handleGameClick = (game) => { setViewingGameStats(game); };
    const handleCloseGameStats = () => { setViewingGameStats(null); };
    const handleBettingCardClick = (bet) => { setViewingLiveBetting(bet); };
    const handleCloseLiveBetting = () => { setViewingLiveBetting(null); };

    const handleFollowToggle = async (targetUserId) => {
        if (!db || !userId) return;
        const currentUserRef = doc(db, `/artifacts/${appId}/users`, userId);
        const targetUserRef = doc(db, `/artifacts/${appId}/users`, targetUserId);

        const newFollowed = new Set(followedUsers);
        let updatedCurrentUserFollowing = usersData[userId]?.stats?.following || [];
        let updatedTargetUserFollowers = usersData[targetUserId]?.stats?.followers || [];

        if (newFollowed.has(targetUserId)) {
            newFollowed.delete(targetUserId);
            updatedCurrentUserFollowing = updatedCurrentUserFollowing.filter(id => id !== targetUserId);
            updatedTargetUserFollowers = updatedTargetUserFollowers.filter(id => id !== userId);
        } else {
            newFollowed.add(targetUserId);
            updatedCurrentUserFollowing = [...updatedCurrentUserFollowing, targetUserId];
            updatedTargetUserFollowers = [...updatedTargetUserFollowers, userId];
        }

        try {
            // Update current user's following list
            await updateDoc(currentUserRef, {
                'stats.following': updatedCurrentUserFollowing
            });
            // Update target user's followers list
            await updateDoc(targetUserRef, {
                'stats.followers': updatedTargetUserFollowers
            });
            setFollowedUsers(newFollowed);
            showAlert(newFollowed.has(targetUserId) ? `Now following ${usersData[targetUserId].user}` : `Unfollowed ${usersData[targetUserId].user}`, 'info');
            handleUserInteraction(); // Interaction for current user
        } catch (error) {
            console.error("Error updating follow status:", error);
            showAlert('Failed to update follow status.', 'error');
        }
    };

    const isFollowingUser = (targetUserId) => followedUsers.has(targetUserId);

    const handlePaymentSuccess = async (order) => {
        if (!db || !userId) return;
        try {
            const ordersRef = collection(db, `/artifacts/${appId}/users/${userId}/orders`);
            await setDoc(doc(ordersRef, order.id), order); // Use setDoc with explicit ID
            setPurchaseHistory(prevHistory => [...prevHistory, order]);
            showAlert('Order placed successfully!', 'success');
        } catch (error) {
            console.error("Error saving order:", error);
            showAlert('Failed to save order. Please try again.', 'error');
        }
    };

    // New function to handle user interactions for fan badge
    const handleUserInteraction = useCallback(async () => {
        if (!db || !userId || usersData[userId]?.role !== 'fan') return;

        const userDocRef = doc(db, `/artifacts/${appId}/users`, userId);
        const currentUser = usersData[userId];
        const newInteractions = (currentUser.interactions || 0) + 1;

        if (newInteractions <= 5) { // Only update if interactions are less than 5
            try {
                await updateDoc(userDocRef, {
                    interactions: newInteractions
                });
                setUsersData(prev => ({
                    ...prev,
                    [userId]: { ...prev[userId], interactions: newInteractions }
                }));
            } catch (error) {
                console.error("Error updating user interactions:", error);
            }
        }
    }, [db, userId, appId, usersData]);

    // New function to handle registration with a specific role
    const handleRegister = async (role) => {
        if (!db || !auth) return;
        try {
            // Create a new anonymous user if not already authenticated
            let currentFirebaseUser = auth.currentUser;
            if (!currentFirebaseUser) {
                const anonResult = await signInAnonymously(auth);
                currentFirebaseUser = anonResult.user;
            }

            const newUserId = currentFirebaseUser.uid;
            const userDocRef = doc(db, `/artifacts/${appId}/users`, newUserId);

            const defaultProfile = {
                id: newUserId,
                user: 'New SportSphere User',
                avatar: 'https://placehold.co/32x32/22C55E/FFFFFF?text=S',
                verificationTier: role, // Default verification tier to the selected role
                cover: 'https://placehold.co/1200x400/22C55E/FFFFFF?text=My+SportSphere+Cover',
                bio: `Welcome to SportSphere as a ${role}!`,
                joined: new Date().toISOString(),
                location: 'Global',
                website: '',
                stats: { posts: '0', followers: '0', following: '0' },
                role: role,
                interactions: role === 'fan' ? 0 : undefined // Reset interactions for new fan, undefined for others
            };
            await setDoc(userDocRef, defaultProfile);
            setUsersData(prev => ({ ...prev, [newUserId]: defaultProfile }));
            setUserId(newUserId);
            setIsLoggedIn(true);
            showAlert(`Sign Up successful as a ${role.charAt(0).toUpperCase() + role.slice(1)}!`, 'success');
        } catch (error) {
            console.error("Error during registration:", error);
            showAlert("Registration failed. Please try again.", "error");
        }
    };

    const renderContent = () => {
        if (!isAuthReady) {
            return <div className="flex justify-center items-center h-full text-xl">Loading SportSphere...</div>;
        }

        if (viewingProfile) {
            return <ProfilePage user={viewingProfile} onClose={handleCloseProfile} onUserClick={handleUserClick} onEditProfile={handleEditProfile} onFollowToggle={handleFollowToggle} isFollowingUser={isFollowingUser} usersData={usersData} onInteraction={handleUserInteraction} />;
        }

        switch (activeTab) {
            case 'Feed': return <SportsFeed onStoryClick={handleStoryClick} onUserClick={handleUserClick} onFollowToggle={handleFollowToggle} isFollowingUser={isFollowingUser} showAlert={showAlert} usersData={usersData} onInteraction={handleUserInteraction} posts={posts} db={db} appId={appId} />;
            case 'Highlights': return <HighlightsHub onUserClick={handleUserClick} usersData={usersData} onInteraction={handleUserInteraction} />;
            case 'Live': return <LiveTab onGameClick={handleGameClick} onBettingCardClick={handleBettingCardClick} />;
            case 'ProZone': return <ProZone usersData={usersData} onInteraction={handleUserInteraction} db={db} appId={appId} userId={userId} />;
            case 'Messaging': return <Messaging onUserClick={handleUserClick} usersData={usersData} onInteraction={handleUserInteraction} />;
            case 'OnlineShop': return <OnlineShop showAlert={showAlert} onPaymentSuccess={handlePaymentSuccess} />;
            case 'Orders': return <OrdersPage purchaseHistory={purchaseHistory} />;
            default: return <HighlightsHub onUserClick={handleUserClick} usersData={usersData} onInteraction={handleUserInteraction} />;
        }
    };

    return (
        <>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>{`
                @keyframes progress { from { width: 0%; } to { width: 100%; } }
                .animate-progress { animation: progress linear; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in-up { animation: fade-in-up 0.3s ease-out; }
                @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
                .animate-marquee { animation: marquee 8s linear infinite; }
            `}</style>
            
            {messageBox.show && <MessageBox message={messageBox.message} type={messageBox.type} onClose={closeAlert} />}

            {!isLoggedIn ? (
                <LoginPage onLogin={() => setIsLoggedIn(true)} showAlert={showAlert} onRegister={handleRegister} />
            ) : (
                <div className="bg-white dark:bg-black min-h-screen flex text-gray-800 dark:text-gray-200 font-sans">
                    {storyViewerState.isOpen && (<StoryViewer stories={mockStories} activeIndex={storyViewerState.activeIndex} onClose={handleCloseStoryViewer} onNext={handleNextStory} onPrev={handlePrevStory} onUserClick={handleUserClick} usersData={usersData} />)}
                    {editingProfile && <EditProfileModal user={editingProfile} onClose={handleCloseEditProfile} onSave={handleSaveProfile} showAlert={showAlert} />}
                    {viewingGameStats && <MatchStatsModal game={viewingGameStats} onClose={handleCloseGameStats} showAlert={showAlert} />}
                    {viewingLiveBetting && <LiveBettingModal bet={viewingLiveBetting} onClose={() => setViewingLiveBetting(null)} showAlert={showAlert} />}
                    {showNewPostModal && <NewPostModal onClose={() => setShowNewPostModal(false)} showAlert={showAlert} usersData={usersData} db={db} appId={appId} userId={userId} />}

                    <aside className={`bg-white dark:bg-black transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'} hidden md:flex flex-col border-r border-gray-200 dark:border-gray-800`}>
                        <div className={`flex items-center p-4 h-16 border-b border-gray-200 dark:border-gray-800 ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}>{isSidebarOpen ? <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-orange-400">SportSphere</h1> : <Trophy className="text-pink-500" size={28}/>}</div>
                        <nav className="flex-grow p-4 space-y-2">
                            <NavItem icon={<Shield size={28} />} label="Feed" tabName="Feed" />
                            <NavItem icon={<Video size={28} />} label="Highlights" tabName="Highlights" />
                            <NavItem icon={<Radio size={28} />} label="Live" tabName="Live" />
                            <NavItem icon={<Briefcase size={28} />} label="Pro Zone" tabName="ProZone" />
                            <NavItem icon={<Mail size={28} />} label="Messages" tabName="Messaging" />
                            <NavItem icon={<ShoppingCart size={28} />} label="Online Shop" tabName="OnlineShop" />
                            <NavItem icon={<Award size={28} />} label="Orders" tabName="Orders" />
                        </nav>
                        <div className="p-4 border-t border-gray-200 dark:border-gray-800"><button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="flex items-center w-full px-4 py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"><Menu size={28}/>{isSidebarOpen && <span className="ml-4 font-semibold">Menu</span>}</button></div>
                    </aside>
                    <main className="flex-1 flex flex-col h-screen bg-gray-50 dark:bg-black">
                        <header className="bg-white dark:bg-black h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800 z-20 flex-shrink-0 md:hidden"><h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-orange-400">SportSphere</h1><div className="flex items-center space-x-4"><button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><Bell size={24} /></button><button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><Mail size={24} /></button></div></header>
                        <div className="flex-1 overflow-y-auto">{renderContent()}</div>

                        {/* Floating Action Button for New Post */}
                        <button
                            className="fixed bottom-20 right-6 md:bottom-6 md:right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-30"
                            onClick={() => setShowNewPostModal(true)}
                        >
                            <Plus size={28} />
                        </button>
                    </main>
                    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 flex justify-around p-2">
                        <button onClick={() => setActiveTab('Feed')} className={`p-2 rounded-full ${activeTab === 'Feed' ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}><Shield size={28} strokeWidth={activeTab === 'Feed' ? 2.5: 2}/></button>
                        <button onClick={() => setActiveTab('Highlights')} className={`p-2 rounded-full ${activeTab === 'Highlights' ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}><Video size={28} strokeWidth={activeTab === 'Highlights' ? 2.5: 2}/></button>
                        <button onClick={() => setActiveTab('Live')} className={`p-2 rounded-full ${activeTab === 'Live' ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}><Radio size={28} strokeWidth={activeTab === 'Live' ? 2.5: 2}/></button>
                        <button onClick={() => setActiveTab('ProZone')} className={`p-2 rounded-full ${activeTab === 'ProZone' ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}><Briefcase size={28} strokeWidth={activeTab === 'ProZone' ? 2.5: 2}/></button>
                        <button onClick={() => setActiveTab('OnlineShop')} className={`p-2 rounded-full ${activeTab === 'OnlineShop' ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}><ShoppingCart size={28} strokeWidth={activeTab === 'OnlineShop' ? 2.5: 2}/></button>
                        <button onClick={() => setActiveTab('Orders')} className={`p-2 rounded-full ${activeTab === 'Orders' ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}><Award size={28} strokeWidth={activeTab === 'Orders' ? 2.5: 2}/></button>
                        <button onClick={() => { handleUserClick(userId); }} className={`p-2 rounded-full text-gray-500`}><img src={usersData[userId]?.avatar || 'https://placehold.co/32x32/22C55E/FFFFFF?text=S'} alt="User" className="w-7 h-7 rounded-full" /></button>
                    </nav>
                </div>
            )}

            {/* Footer */}
            <footer className="bg-white dark:bg-black text-gray-600 dark:text-gray-300 py-6 text-center border-t border-gray-200 dark:border-gray-800">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-3">
                        <a href="#" className="hover:underline">Contact Us</a>
                        <a href="#" className="hover:underline">About Us</a>
                        <a href="#" className="hover:underline">Follow Us</a>
                    </div>
                    <p className="text-sm">Developed by: David Mbazza</p>
                </div>
            </footer>
        </>
    );
}