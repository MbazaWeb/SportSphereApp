import React from 'react';
import { Plus, Search } from 'lucide-react';
import MessageItem from '../components/messaging/MessageItem';

const Messaging = ({ onUserClick, usersData, onInteraction }) => {
    const mockMessages = [ // Keeping this mock for now as direct messages are more complex for Firestore
        { id: 1, platform: 'Twitter', userId: 'ffguru', message: 'Who are you starting at FLEX this week?', time: '15m' },
        { id: 2, platform: 'kingjames', message: 'You ready for the game tonight?', time: '1h' },
        { id: 3, platform: 'Facebook', userId: 'manutd', message: 'Check out the new kit reveal!', time: '3h' },
        { id: 4, platform: 'Twitter', userId: 'wojespn', message: 'Got a big scoop for you, dropping soon.', time: '1d' },
        { id: 5, platform: 'TikTok', userId: 'patmcafee', message: 'HAHTAHT! What a play!', time: '2d' }
    ];

    return (
        <div className="p-4 pt-6 bg-gray-50 dark:bg-black h-full text-gray-800 dark:text-gray-200">
            <div className="max-w-lg mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Sports Chat</h2>
                    <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                        <Plus size={24} />
                    </button>
                </div>
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search messages..."
                        className="w-full bg-gray-100 dark:bg-gray-700 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="space-y-2">
                    {mockMessages.map(msg => <MessageItem key={msg.id} msg={msg} onUserClick={onUserClick} usersData={usersData} onInteraction={onInteraction} />)}
                </div>
            </div>
        </div>
    );
};

export default Messaging;