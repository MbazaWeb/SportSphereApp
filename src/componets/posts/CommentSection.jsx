import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import Comment from './Comment';

const CommentSection = ({ comments: initialComments, commentCount: initialCommentCount, onUserClick, usersData, onInteraction, postId, db, appId }) => {
    const [comments, setComments] = useState(initialComments || []);
    const [commentCount, setCommentCount] = useState(initialCommentCount);
    const [newComment, setNewComment] = useState('');

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim() === '') return;
        try {
            const commentsRef = collection(db, `/artifacts/${appId}/public/data/posts/${postId}/comments`);
            await addDoc(commentsRef, {
                userId: 'currentuser', // Assuming current user's ID
                text: newComment,
                likes: 0,
                dislikes: 0,
                timestamp: new Date().toISOString()
            });
            setNewComment('');
            onInteraction(); // Call onInteraction for fan badge logic
        } catch (error) {
            console.error("Error adding comment:", error);
            // Optionally show an error message to the user
        }
    };

    useEffect(() => {
        if (!db || !postId || !appId) return;

        const commentsRef = collection(db, `/artifacts/${appId}/public/data/posts/${postId}/comments`);
        const unsubscribe = onSnapshot(commentsRef, (snapshot) => {
            const fetchedComments = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            fetchedComments.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
            setComments(fetchedComments);
            setCommentCount(fetchedComments.length);
        }, (error) => {
            console.error("Error fetching comments:", error);
        });

        return () => unsubscribe(); // Clean up the listener
    }, [db, postId, appId]);

    return (
        <div className="mt-3">
            {comments.map((comment, index) => (
                <Comment key={comment.id || index} comment={comment} onUserClick={onUserClick} usersData={usersData} />
            ))}
            <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2 mt-3">
                <img src={usersData['currentuser']?.avatar} alt="current user" className="w-8 h-8 rounded-full" />
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="text-blue-500 font-semibold text-sm hover:text-blue-600 disabled:text-gray-400" disabled={!newComment.trim()}>Post</button>
            </form>
        </div>
    );
};

export default CommentSection;