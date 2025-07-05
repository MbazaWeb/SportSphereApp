import React from 'react';
import { Star, Clipboard, Radio, Video } from 'lucide-react';

const videoTypeStyles = {
    highlight: { label: 'Highlight', icon: <Star size={14} />, color: 'bg-yellow-500/80' },
    news: { label: 'News', icon: <Clipboard size={14} />, color: 'bg-blue-500/80' },
    live: { label: 'LIVE', icon: <Radio size={14} />, color: 'bg-red-600/80 animate-pulse' },
    reel: { label: 'Reel', icon: <Video size={14} />, color: 'bg-purple-600/80' },
};

const VideoTypeBadge = ({ type }) => {
    const style = videoTypeStyles[type] || {};
    if (!style.label) return null;
    return (
        <div className={`absolute top-4 left-4 flex items-center space-x-2 text-white text-xs font-bold p-1.5 rounded-full backdrop-blur-md z-10 ${style.color}`}>
            {style.icon}
            <span>{style.label}</span>
        </div>
    );
};

export default VideoTypeBadge;