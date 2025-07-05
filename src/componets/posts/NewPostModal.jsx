import React, { useState } from 'react';
import { X, Image, ListTodo, Film } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';

const NewPostModal = ({ onClose, showAlert, usersData, db, appId, userId }) => {
    const [postContent, setPostContent] = useState('');
    const [mediaFile, setMediaFile] = useState(null);
    const [pollOptions, setPollOptions] = useState(['', '']);
    const [taggedUsers, setTaggedUsers] = useState('');
    const [showPollInputs, setShowPollInputs] = useState(false);

    const handleMediaChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setMediaFile(e.target.files[0].name);
        }
    };

    const handlePollOptionChange = (index, value) => {
        const newOptions = [...pollOptions];
        newOptions[index] = value;
        setPollOptions(newOptions);
    };

    const addPollOption = () => {
        if (pollOptions.length < 4) { // Limit to 4 options
            setPollOptions([...pollOptions, '']);
        }
    };

    const handleSubmitPost = async () => {
        if (!db || !appId || !userId) return;
        try {
            const postsRef = collection(db, `/artifacts/${appId}/public/data/posts`);
            await addDoc(postsRef, {
                userId: userId,
                content: postContent,
                image: mediaFile ? `https://placehold.co/600x400/CCCCCC/FFFFFF?text=Uploaded+${mediaFile.split('.')[0]}` : null, // Simulate image URL
                poll: showPollInputs ? pollOptions.filter(opt => opt.trim() !== '') : null,
                taggedUsers: taggedUsers.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
                time: new Date().toISOString(),
                likes: 0,
                comments: 0,
                platform: 'SportSphere', // Default platform for new posts
                likedBy: [],
                bookmarkedBy: []
            });
            showAlert('Post created successfully!', 'success');
            onClose();
        } catch (error) {
            console.error("Error creating post:", error);
            showAlert('Failed to create post. Please try again.', 'error');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md transform transition-all scale-100 opacity-100 animate-fade-in-up">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Create New Post</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6 space-y-5">
                    <textarea
                        className="w-full p-4 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 resize-y"
                        rows="6"
                        placeholder="What's on your mind? Share your sports thoughts, news, or updates!"
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                    ></textarea>

                    <div className="flex flex-wrap items-center gap-4">
                        <label htmlFor="media-upload" className="flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition-colors shadow-md">
                            <Image size={20} />
                            <span>Add Media</span>
                            <input type="file" id="media-upload" className="hidden" onChange={handleMediaChange} />
                        </label>
                        {mediaFile && <span className="text-sm text-gray-600 dark:text-gray-400 font-medium flex items-center"><Film size={16} className="mr-1"/> {mediaFile}</span>}

                        <button onClick={() => setShowPollInputs(!showPollInputs)} className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors shadow-md ${showPollInputs ? 'bg-green-600 text-white' : 'bg-green-500 text-white hover:bg-green-600'}`}>
                            <ListTodo size={20} />
                            <span>{showPollInputs ? 'Hide Poll' : 'Create Poll'}</span>
                        </button>
                    </div>

                    {showPollInputs && (
                        <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                            <p className="font-semibold text-gray-800 dark:text-gray-200 text-lg mb-2">Poll Options:</p>
                            {pollOptions.map((option, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                                    placeholder={`Option ${index + 1}`}
                                    value={option}
                                    onChange={(e) => handlePollOptionChange(index, e.target.value)}
                                />
                            ))}
                            {pollOptions.length < 4 && (
                                <button onClick={addPollOption} className="text-blue-500 text-sm font-semibold hover:underline mt-2">
                                    + Add another option
                                </button>
                            )}
                        </div>
                    )}

                    <div>
                        <label htmlFor="tagged-users" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tag Users (e.g., @LeBron James, @Man Utd)</label>
                        <input
                            type="text"
                            id="tagged-users"
                            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                            value={taggedUsers}
                            onChange={(e) => setTaggedUsers(e.target.value)}
                        />
                    </div>
                </div>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <button
                        onClick={handleSubmitPost}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={postContent.trim() === '' && !mediaFile && !showPollInputs}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewPostModal;