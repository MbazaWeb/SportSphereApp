import React from 'react';
import StoriesTray from '../components/stories/StoriesTray';
import PostCard from '../components/posts/PostCard';
import { mockStories } from '../data/mockData';

const SportsFeed = ({ onStoryClick, onUserClick, onFollowToggle, isFollowingUser, showAlert, usersData, onInteraction, posts, db, appId }) => {
    return (
        <div className="w-full bg-gray-50 dark:bg-black">
            <div className="max-w-lg mx-auto">
                <StoriesTray stories={mockStories} onStoryClick={onStoryClick} onUserClick={onUserClick} usersData={usersData} onInteraction={onInteraction} />
            </div>
            <div className="pt-6">
                {posts.map(post => <PostCard key={post.id} post={post} onUserClick={onUserClick} onFollowToggle={onFollowToggle} isFollowingUser={isFollowingUser} showAlert={showAlert} usersData={usersData} onInteraction={onInteraction} db={db} appId={appId} />)}
            </div>
        </div>
    );
};

export default SportsFeed;