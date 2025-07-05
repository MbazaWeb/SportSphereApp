import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { collection, addDoc, onSnapshot, query } from 'firebase/firestore';
import ChannelMessageCard from '../components/prozone/ChannelMessageCard';
import ProContentCard from '../components/prozone/ProContentCard'; // If you have mock data for this, add it here

const ProZone = ({ usersData, onInteraction, db, appId, userId }) => {
    const [channelMessages, setChannelMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        if (!db || !appId) return;

        const channelMessagesRef = collection(db, `/artifacts/${appId}/public/data/channelMessages`);
        const q = query(channelMessagesRef);

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedMessages = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            fetchedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
            setChannelMessages(fetchedMessages);
        }, (error) => {
            console.error("Error fetching channel messages:", error);
        });

        return () => unsubscribe();
    }, [db, appId]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;
        if (!db || !appId || !userId) return;

        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const newMsg = {
            sender: usersData[userId]?.user || 'Anonymous',
            message: newMessage.trim(),
            time: timeString,
            avatar: usersData[userId]?.avatar || 'https://placehold.co/32x32/000000/FFFFFF?text=?',
            isUserMessage: true,
            timestamp: now.toISOString()
        };

        try {
            const channelMessagesRef = collection(db, `/artifacts/${appId}/public/data/channelMessages`);
            await addDoc(channelMessagesRef, newMsg);
            setNewMessage('');
            onInteraction();
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-black">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 p-4 max-w-lg mx-auto w-full">Sports Industry Channel</h2>
            <div className="flex-1 overflow-y-auto p-4 space-y-2 max-w-lg mx-auto w-full">
                {channelMessages.map(msg => (
                    <ChannelMessageCard key={msg.id} message={msg} />
                ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-black flex items-center space-x-2 max-w-lg mx-auto w-full">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full disabled:opacity-50" disabled={!newMessage.trim()}>
                    <Send size={20} />
                </button>
            </form>
        </div>
    );
};

export default ProZone;