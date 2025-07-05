import React, { useState } from 'react';
import { X, ThumbsUp, ThumbsDown, Share2 } from 'lucide-react';

const MatchStatsModal = ({ game, onClose, showAlert }) => {
    if (!game) return null;
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [showShareConfirmation, setShowShareConfirmation] = useState(false);

    const handleShare = async () => {
        const shareData = { title: `${game.team1} vs ${game.team2}`, text: `Check out the live stats for ${game.team1} vs ${game.team2}!`, url: window.location.href };
        const showConfirmation = () => { setShowShareConfirmation(true); setTimeout(() => setShowConfirmation(false), 2000); };
        try {
            if (navigator.share) { await navigator.share(shareData); } else { throw new Error("Web Share API not supported"); }
        } catch (err) {
            try { await navigator.clipboard.writeText(shareData.url); showConfirmation(); } catch (clipErr) { console.error("Clipboard API failed:", clipErr); }
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm m-4" onClick={e => e.stopPropagation()}> {/* max-w-sm for smaller size */}
                <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center"> {/* smaller padding */}
                    <h2 className="text-md font-bold">{game.team1} vs {game.team2}</h2> {/* smaller font size */}
                    <button onClick={onClose}><X size={20} /></button> {/* smaller icon */}
                </div>
                <div className="p-3"> {/* smaller padding */}
                    <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-3"> {/* smaller padding */}
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold">{game.team1}</span> {/* smaller font size */}
                            <span className="text-2xl font-bold">{game.score1}</span> {/* smaller font size */}
                        </div>
                        <div className="flex justify-between items-center mt-1"> {/* smaller margin */}
                            <span className="text-lg font-bold">{game.team2}</span> {/* smaller font size */}
                            <span className="text-2xl font-bold">{game.score2}</span> {/* smaller font size */}
                        </div>
                        <p className="text-center text-red-500 font-bold text-xs mt-1 animate-pulse">{game.time}</p> {/* smaller font size */}
                    </div>
                    <h3 className="font-bold text-sm mt-3 mb-1">Team Stats</h3> {/* smaller font size */}
                    <div className="grid grid-cols-3 gap-x-2 gap-y-1 text-center text-xs"> {/* smaller gap, smaller font size */}
                        <div className="font-bold text-gray-500 dark:text-gray-400">Stat</div>
                        <div className="font-bold text-gray-500 dark:text-gray-400">Stat</div>
                        <div className="font-bold text-gray-500 dark:text-gray-400">{game.team2}</div>
                        {Object.keys(game.stats.team1).map(key => (
                            <React.Fragment key={key}>
                                <div className="font-semibold">{game.stats.team1[key]}</div>
                                <div className="text-xs text-gray-500">{key}</div>
                                <div className="font-semibold">{game.stats.team2[key]}</div>
                            </React.Fragment>
                        ))}
                    </div>
                    <h3 className="font-bold text-sm mt-3 mb-1">Top Performers</h3> {/* smaller font size */}
                    {game.stats.topPerformers.map((player, index) => (
                        <div key={index} className="flex justify-between items-center text-xs mb-1"> {/* smaller font size */}
                            <span>{player.name}</span>
                            <span className="font-semibold text-xs">PTS: {player.pts} | REB: {player.reb} | AST: {player.ast}</span>
                        </div>
                    ))}
                </div>
                <div className="p-2 border-t border-gray-200 dark:border-gray-700 flex justify-around items-center">
                    <button onClick={() => setIsLiked(!isLiked)} className={`p-2 rounded-full flex items-center space-x-1 transition-colors ${isLiked ? 'text-blue-500' : 'hover:text-blue-500'}`}>
                        <ThumbsUp size={18} className={isLiked ? 'fill-current' : ''} /> <span className="text-xs">Like</span>
                    </button>
                    <button onClick={() => setIsDisliked(!isDisliked)} className={`p-2 rounded-full flex items-center space-x-1 transition-colors ${isDisliked ? 'text-red-500' : 'hover:text-red-500'}`}>
                        <ThumbsDown size={18} className={isDisliked ? 'fill-current' : ''} /> <span className="text-xs">Dislike</span>
                    </button>
                    <button onClick={handleShare} className="p-2 rounded-full flex items-center space-x-1 hover:text-green-500">
                        <Share2 size={18} /> <span className="text-xs">Share</span>
                    </button>
                </div>
                {showShareConfirmation && <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">Link Copied!</div>}
            </div>
        </div>
    );
};

export default MatchStatsModal;