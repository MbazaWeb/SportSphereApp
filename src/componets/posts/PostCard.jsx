import React, { useState } from 'react';
import { Heart, MessageSquare, Share2, Bookmark, X, Plus, MoreHorizontal } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import VerifiedBadge from '../badges/VerifiedBadge';
import PlatformIcon from '../common/PlatformIcon';
import CommentSection from './CommentSection';
import { formatTimeAgo } from '../../utils/formatters';

const PostCard = ({ post, onUserClick, onFollowToggle, isFollowingUser, showAlert, usersData, onInteraction, db, appId }) => {
    const user = usersData[post.userId];
    if (!user) return null;

    const [isLiked, setIsLiked] = useState(post.likedBy?.includes('currentuser') || false);
    const [likeCount, setLikeCount] = useState(post.likes);
    const [isBookmarked, setIsBookmarked] = useState(post.bookmarkedBy?.includes('currentuser') || false);
    const [showShareConfirmation, setShowShareConfirmation] = useState(false);
    const [showComments, setShowComments] = useState(false);

    const handleLike = async () => {
        if (!db || !appId) return;
        const postRef = doc(db, `/artifacts/${appId}/public/data/posts`, post.id);
        const newLikedState = !isLiked;
        const newLikeCount = newLikedState ? likeCount + 1 : likeCount - 1;
        const newLikedBy = newLikedState
            ? [...(post.likedBy || []), 'currentuser']
            : (post.likedBy || []).filter(id => id !== 'currentuser');
        try {
            await updateDoc(postRef, {
                likes: newLikeCount,
                likedBy: newLikedBy
            });
            setIsLiked(newLikedState);
            setLikeCount(newLikeCount);
            onInteraction();
        } catch (error) {
            console.error("Error updating like:", error);
        }
    };

    const handleBookmark = async () => {
        if (!db || !appId) return;
        const postRef = doc(db, `/artifacts/${appId}/public/data/posts`, post.id);
        const newBookmarkedState = !isBookmarked;
        const newBookmarkedBy = newBookmarkedState
            ? [...(post.bookmarkedBy || []), 'currentuser']
            : (post.bookmarkedBy || []).filter(id => id !== 'currentuser');
        try {
            await updateDoc(postRef, {
                bookmarkedBy: newBookmarkedBy
            });
            setIsBookmarked(newBookmarkedState);
            onInteraction();
        } catch (error) {
            console.error("Error updating bookmark:", error);
        }
    };

    const handleShare = async () => {
        const shareData = {
            title: `Check out this post from ${user.user}!`, // Use user.user
            text: post.content,
            url: window.location.href,
        };
        const showConfirmation = () => {
            setShowShareConfirmation(true);
            setTimeout(() => setShowConfirmation(false), 2000);
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                throw new Error("Web Share API not supported");
            }
        } catch (err) {
            console.log("Share failed, falling back to clipboard:", err);
            try {
                await navigator.clipboard.writeText(shareData.url);
                showConfirmation();
            } catch (clipErr) {
                console.error("Clipboard API failed:", clipErr);
                const textArea = document.createElement("textarea");
                textArea.value = shareData.url;
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand('copy');
                    showConfirmation();
                } catch (execErr) {
                    console.error('Fallback copy failed:', execErr);
                }
                document.body.removeChild(textArea);
            }
        }
        onInteraction(); // Call onInteraction for fan badge logic
    };

    const isInstagramStyle = post.platform === 'Instagram' && post.image;
    const timeAgo = formatTimeAgo(post.time);

    if (isInstagramStyle) {
        return (
            <div className="bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-800 mb-6 max-w-lg mx-auto relative">
                {showShareConfirmation && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white px-4 py-2 rounded-lg">Link Copied!</div>}
                <div className="flex items-center p-3">
                    <img src={user.avatar} alt={user.user} className="w-9 h-9 rounded-full mr-3 cursor-pointer" onClick={() => onUserClick(user.id)} />
                    <div className="flex-grow">
                        <div className="font-bold text-sm text-gray-800 dark:text-gray-200 flex items-center cursor-pointer" onClick={() => onUserClick(user.id)}>
                            {user.user}
                            <VerifiedBadge tier={user.verificationTier} />
                            {onFollowToggle && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); onFollowToggle(user.id); onInteraction(); }} // Pass userId and call onInteraction
                                    className="ml-2 p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                                >
                                    {isFollowingUser(user.id) ? <X size={16} /> : <Plus size={16} />}
                                </button>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo}</p>
                    </div>
                    <button className="ml-auto"><MoreHorizontal size={20} className="text-gray-600 dark:text-gray-400" /></button>
                </div>
                <img src={post.image} alt="Post content" className="w-full h-auto" />
                <div className="p-3 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <button onClick={handleLike}><Heart size={26} className={`${isLiked ? 'text-red-500 fill-current' : 'text-gray-800 dark:text-gray-200'} hover:text-red-500`} /></button>
                        <button onClick={() => setShowComments(!showComments)}><MessageSquare size={26} className="text-gray-800 dark:text-gray-200" /></button>
                        <button onClick={handleShare}><Share2 size={26} className="text-gray-800 dark:text-gray-200" /></button>
                    </div>
                    <button onClick={handleBookmark}><Bookmark size={26} className={`${isBookmarked ? 'text-yellow-500 fill-current' : 'text-gray-800 dark:text-gray-200'} hover:text-yellow-500`} /></button>
                </div>
                <div className="px-3 pb-3">
                    <p className="font-bold text-sm text-gray-900 dark:text-gray-100">{likeCount.toLocaleString()} likes</p>
                    <div className="text-sm mt-1 text-gray-800 dark:text-gray-200">
                        <span className="font-bold mr-1 cursor-pointer" onClick={() => onUserClick(user.id)}>{user.user}</span>
                        <VerifiedBadge tier={user.verificationTier} />
                        <span className="ml-1">{post.content}</span>
                    </div>
                    <button onClick={() => setShowComments(!showComments)} className="text-sm text-gray-500 dark:text-gray-400 mt-1 hover:underline">
                        View all {post.comments.toLocaleString()} comments
                    </button>
                    {showComments && <CommentSection comments={post.commentsData} commentCount={post.comments} onUserClick={onUserClick} usersData={usersData} onInteraction={onInteraction} postId={post.id} db={db} appId={appId} />}
                </div>
            </div>
        );
    }
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4 max-w-lg mx-auto overflow-hidden border border-gray-200 dark:border-gray-700 relative">
            {showShareConfirmation && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white px-4 py-2 rounded-lg">Link Copied!</div>}
            <div className="p-4">
                <div className="flex items-center mb-4">
                    <img src={user.avatar} alt={user.user} className="w-12 h-12 rounded-full mr-4 cursor-pointer" onClick={() => onUserClick(user.id)} />
                    <div className="flex-grow">
                        <div className="flex items-center cursor-pointer" onClick={() => onUserClick(user.id)}>
                            <p className="font-bold text-gray-800 dark:text-gray-200">{user.user}</p>
                            <VerifiedBadge tier={user.verificationTier} />
                            {onFollowToggle && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); onFollowToggle(user.id); onInteraction(); }}
                                    className="ml-2 p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                                >
                                    {isFollowingUser(user.id) ? <X size={16} /> : <Plus size={16} />}
                                </button>
                            )}
                        </div>
                        {post.handle && <p className="text-gray-500 dark:text-gray-400 text-sm">{post.handle}</p>}
                        <p className="text-sm text-gray-500 dark:text-gray-400">{timeAgo}</p>
                    </div>
                    <div className="ml-auto"><PlatformIcon platform={post.platform} className="w-6 h-6" /></div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>
            </div>
            {post.image && <img src={post.image} alt="Post content" className="w-full h-auto" />}
            <div className="p-4 flex justify-between items-center text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-6">
                    <button onClick={handleLike} className={`flex items-center space-x-1 transition-colors ${isLiked ? 'text-red-500' : 'hover:text-red-500'}`}><Heart size={20} className={isLiked ? 'fill-current' : ''} /><span>{likeCount.toLocaleString()}</span></button>
                    <button onClick={() => setShowComments(!showComments)} className="flex items-center space-x-1 hover:text-blue-500 transition-colors"><MessageSquare size={20} /><span>{post.comments.toLocaleString()}</span></button>
                    <button onClick={handleShare} className="flex items-center space-x-1 hover:text-green-500 transition-colors"><Share2 size={20} /></button>
                </div>
                <button onClick={handleBookmark}><Bookmark size={20} className={isBookmarked ? 'text-yellow-500 fill-current' : ''} /></button>
            </div>
            {showComments && <div className="px-4 pb-2"><CommentSection comments={post.commentsData} commentCount={post.comments} onUserClick={onUserClick} usersData={usersData} onInteraction={onInteraction} postId={post.id} db={db} appId={appId} /></div>}
        </div>
    );
};

export default PostCard;