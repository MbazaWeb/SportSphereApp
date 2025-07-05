import React from 'react';

const Story = ({ story, onClick, usersData }) => {
    const user = usersData[story.userId];
    if (!user) return null;

    return (
        <div className="flex flex-col items-center space-y-1 flex-shrink-0 cursor-pointer" onClick={onClick}>
            <div className={`p-0.5 rounded-full ${story.viewed ? 'bg-gray-300 dark:bg-gray-700' : 'bg-gradient-to-tr from-yellow-400 via-red-500 to-pink-500'}`}>
                <div className="bg-white dark:bg-black p-0.5 rounded-full">
                    <img src={user.avatar} alt={user.user} className="w-16 h-16 rounded-full" />
                </div>
            </div>
            <p className="text-xs text-center text-gray-700 dark:text-gray-300 w-20 truncate">{user.user}</p>
        </div>
    );
};

export default Story;