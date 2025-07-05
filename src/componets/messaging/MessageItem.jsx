import React from 'react';
import PlatformIcon from '../common/PlatformIcon';
import VerifiedBadge from '../badges/VerifiedBadge';

const MessageItem = ({ msg, onUserClick, usersData, onInteraction }) => {
    const user = usersData[msg.userId];
    if (!user) return null;

    return (
        <div className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer" onClick={() => { onUserClick(user.id); onInteraction(); }}>
            <img src={user.avatar} alt={user.user} className="w-12 h-12 rounded-full mr-4" />
            <div className="flex-grow overflow-hidden">
                <div className="flex justify-between">
                    <div className="font-bold text-gray-800 dark:text-gray-200 flex items-center">{user.user} <VerifiedBadge tier={user.verificationTier} /></div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0 ml-2">{msg.time}</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{msg.message}</p>
            </div>
            <PlatformIcon platform={msg.platform} className="w-5 h-5 ml-3 flex-shrink-0" />
        </div>
    );
};

export default MessageItem;