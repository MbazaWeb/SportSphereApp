import React from 'react';
import VideoCard from '../components/videos/VideoCard';
import { mockVideos } from '../data/mockData';

const HighlightsHub = ({ onUserClick, usersData, onInteraction }) => (
    <div className="h-full w-full overflow-y-auto snap-y snap-mandatory">
        {mockVideos.map(video => <VideoCard key={video.id} video={video} onUserClick={onUserClick} usersData={usersData} onInteraction={onInteraction} />)}
    </div>
);

export default HighlightsHub;