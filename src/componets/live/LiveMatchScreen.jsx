import React from 'react';
import { X, Video } from 'lucide-react';

const LiveMatchScreen = ({ match, onClose }) => {
    if (!match) return null;
    return (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center">
            <div className="w-full max-w-4xl h-full max-h-[90vh] bg-gray-900 rounded-lg overflow-hidden flex flex-col">
                <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
                    <h2 className="text-lg font-bold">{match.team1} vs {match.team2} - LIVE</h2>
                    <button onClick={onClose} className="text-gray-300 hover:text-white"><X size={24} /></button>
                </div>
                <div className="flex-1 flex items-center justify-center bg-black">
                    {/* Placeholder for live video stream */}
                    <Video size={64} className="text-gray-600" />
                    <p className="text-white ml-4">Live Stream Placeholder</p>
                </div>
                <div className="p-4 bg-gray-800 text-white flex justify-around text-center">
                    <div>
                        <p className="text-2xl font-bold">{match.score1}</p>
                        <p className="text-sm">{match.team1}</p>
                    </div>
                    <div className="text-red-500 font-bold text-lg flex items-center">{match.time}</div>
                    <div>
                        <p className="text-2xl font-bold">{match.score2}</p>
                        <p className="text-sm">{match.team2}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveMatchScreen;