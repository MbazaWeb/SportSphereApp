import React, { useState } from 'react';
import { Heart, MessageSquare, Share2, Play, Music } from 'lucide-react';
import VerifiedBadge from '../badges/VerifiedBadge';
import VideoTypeBadge from './VideoTypeBadge';

const VideoCard = ({ video, onUserClick, usersData, onInteraction }) => {
    const user = usersData[video.userId];
    if (!user) return null;

    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(video.likes);
    const [isPaused, setIsPaused] = useState(false);
    const [showHeart, setShowHeart] = useState(false);
    const [showShareConfirmation, setShowShareConfirmation] = useState(false);

    const handleLike = () => {
        setIsLiked(prev => !prev);
        setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));
        onInteraction();
    };

    const handleDoubleClick = () => {
        if (!isLiked) {
            handleLike();
        }
        setShowHeart(true);
        setTimeout(() => setShowHeart(false), 1000);
    };

    const handleShare = async () => {
        const shareData = { title: `Check out this video from ${user.user}!`, text: video.content, url: window.location.href };
        const showConfirmation = () => { setShowShareConfirmation(true); setTimeout(() => setShowConfirmation(false), 2000); };
        try {
            if (navigator.share) { await navigator.share(shareData); } else { throw new Error("Web Share API not supported"); }
        } catch (err) {
            try { await navigator.clipboard.writeText(shareData.url); showConfirmation(); } catch (clipErr) { console.error("Clipboard API failed:", clipErr); }
        }
        onInteraction();
    };

    return (
        <div className="relative h-full w-full bg-black rounded-xl overflow-hidden snap-center shadow-xl" onDoubleClick={handleDoubleClick}>
            <div className="absolute inset-0" onClick={() => setIsPaused(!isPaused)}></div>
            <img src={video.videoUrl} alt="Video" className="absolute top-0 left-0 w-full h-full object-cover" />
            <VideoTypeBadge type={video.videoType} />
            {isPaused && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50 rounded-full p-4 z-10 flex items-center justify-center"><Play size={48} className="text-white fill-white" /></div>}
            {showHeart && <Heart size={100} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/80 animate-ping z-10" style={{animationDuration: '0.6s'}} />}
            {showShareConfirmation && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white px-4 py-2 rounded-lg z-10">Link Copied!</div>}
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                <div className="flex items-end">
                    <div className="flex-grow">
                        <div className="flex items-center mb-2 cursor-pointer" onClick={() => onUserClick(user.id)}>
                            <img src={user.avatar} alt={user.user} className="w-10 h-10 rounded-full mr-3 border-2 border-white" />
                            <div className="font-bold flex items-center">{user.user} <VerifiedBadge tier={user.verificationTier} /></div>
                        </div>
                        <p className="text-sm mb-2">{video.content}</p>
                        {video.sound && (
                            <div className="flex items-center space-x-2">
                                <Music size={16} />
                                <div className="w-40 overflow-hidden"><p className="text-xs whitespace-nowrap animate-marquee">{video.sound.name} - {video.sound.author}</p></div>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col items-center space-y-6 ml-4">
                        <button onClick={handleLike} className="flex flex-col items-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm ${isLiked ? 'bg-red-500/50' : 'bg-white/20'}`}><Heart size={28} className={isLiked ? 'fill-current text-red-500' : ''} /></div>
                            <span className="text-xs mt-1 font-semibold">{likeCount.toLocaleString()}</span>
                        </button>
                        <button className="flex flex-col items-center"><div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm"><MessageSquare size={28} /></div><span className="text-xs mt-1 font-semibold">{video.comments.toLocaleString()}</span></button>
                        <button onClick={handleShare} className="flex flex-col items-center"><div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm"><Share2 size={28} /></div><span className="text-xs mt-1 font-semibold">{video.shares.toLocaleString()}</span></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;