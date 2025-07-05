import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const StoryViewer = ({ stories, activeIndex, onClose, onNext, onPrev, onUserClick, usersData }) => {
    const story = stories[activeIndex];
    if (!story) return null;

    const user = usersData[story.userId];

    return (
        <div className="fixed inset-0 bg-black z-[90] flex items-center justify-center">
            <div className="relative w-full h-full max-w-md max-h-[90vh] flex items-center justify-center">
                <img src={story.imageUrl} alt="Story" className="max-w-full max-h-full object-contain" />
                <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10">
                    <div className="flex items-center space-x-2">
                        <img src={user.avatar} alt={user.user} className="w-8 h-8 rounded-full border-2 border-white" />
                        <span className="text-white font-semibold">{user.user}</span>
                    </div>
                    <button onClick={onClose} className="text-white"><X size={24} /></button>
                </div>
                <button onClick={onPrev} className="absolute left-2 p-2 rounded-full bg-black/50 text-white z-10"><ChevronLeft size={24} /></button>
                <button onClick={onNext} className="absolute right-2 p-2 rounded-full bg-black/50 text-white z-10"><ChevronRight size={24} /></button>
            </div>
        </div>
    );
};

export default StoryViewer;