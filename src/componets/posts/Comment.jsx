import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import VerifiedBadge from '../badges/VerifiedBadge';

const Comment = ({ comment, onUserClick, usersData }) => {
    const user = usersData[comment.userId];
    if (!user) return null;

    const [reaction, setReaction] = useState(null); // null, 'liked', 'disliked'
    const [likeCount, setLikeCount] = useState(comment.likes || 0);
    const [dislikeCount, setDislikeCount] = useState(comment.dislikes || 0);

    const handleReaction = (newReaction) => {
        if (reaction === newReaction) {
            // Undo reaction
            setReaction(null);
            if (newReaction === 'liked') setLikeCount(likeCount - 1);
            if (newReaction === 'disliked') setDislikeCount(dislikeCount - 1);
        } else {
            // Set new reaction
            let newLikes = likeCount;
            let newDislikes = dislikeCount;
            if (reaction === 'liked') newLikes--;
            if (reaction === 'disliked') newDislikes--;

            if (newReaction === 'liked') newLikes++;
            if (newReaction === 'disliked') newDislikes++;
            
            setReaction(newReaction);
            setLikeCount(newLikes);
            setDislikeCount(newDislikes);
        }
    };

    return (
        <div className="flex items-start space-x-2 mb-2">
            <img src={user.avatar} alt={user.user} className="w-8 h-8 rounded-full cursor-pointer" onClick={() => onUserClick(user.id)} />
            <div className="flex-1">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                    <p className="font-bold text-sm flex items-center cursor-pointer" onClick={() => onUserClick(user.id)}>{user.user} <VerifiedBadge tier={user.verificationTier} /></p>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{comment.text}</p>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400 px-2 mt-1">
                    <button onClick={() => handleReaction('liked')} className={`flex items-center space-x-1 hover:text-blue-500 ${reaction === 'liked' ? 'text-blue-500' : ''}`}>
                        <ThumbsUp size={14} /> <span>{likeCount}</span>
                    </button>
                    <button onClick={() => handleReaction('disliked')} className={`flex items-center space-x-1 hover:text-red-500 ${reaction === 'disliked' ? 'text-red-500' : ''}`}>
                        <ThumbsDown size={14} /> <span>{dislikeCount}</span>
                    </button>
                    <button className="hover:underline">Reply</button>
                </div>
            </div>
        </div>
    );
};

export default Comment;