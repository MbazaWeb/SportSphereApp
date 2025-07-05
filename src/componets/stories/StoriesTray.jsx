import React from 'react';
import Story from './Story';

const StoriesTray = ({ stories, onStoryClick, onUserClick, usersData, onInteraction }) => (
    <div className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 py-3 px-2">
        <div className="flex items-center space-x-4 overflow-x-auto pb-2 -mb-2 no-scrollbar">
            {stories.map((story, index) => (
                <Story key={story.id} story={story} onClick={() => { onStoryClick(index); onInteraction(); }} onUserClick={onUserClick} usersData={usersData} />
            ))}
        </div>
    </div>
);

export default StoriesTray;