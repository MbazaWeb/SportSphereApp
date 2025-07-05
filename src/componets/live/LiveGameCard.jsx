import React from 'react';
import { formatOdds } from '../../utils/formatters';

const LiveGameCard = ({ game, onClick }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4 max-w-lg mx-auto overflow-hidden border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-blue-500" onClick={onClick}>
        <div className="p-4">
            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-2"><span>{game.sport}</span><span className="font-bold text-red-500 animate-pulse">{game.time}</span></div>
            <div className="flex justify-between items-center"><span className="text-lg font-bold text-gray-800 dark:text-gray-200">{game.team1}</span><span className="text-2xl font-bold text-gray-900 dark:text-white">{game.score1}</span></div>
            <div className="flex justify-between items-center mt-1"><span className="text-lg font-bold text-gray-800 dark:text-gray-200">{game.team2}</span><span className="text-2xl font-bold text-gray-900 dark:text-white">{game.score2}</span></div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 p-3 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-3 gap-2 text-center">
                <button className="bg-gray-200 dark:bg-gray-700 p-2 rounded-md hover:bg-green-200 dark:hover:bg-green-800 text-sm">
                    <span className="block font-bold text-gray-800 dark:text-gray-200">{formatOdds(game.odds.team1)}</span>
                    <span className="text-xs text-gray-500">{game.team1}</span>
                </button>
                {game.odds.draw && (<button className="bg-gray-200 dark:bg-gray-700 p-2 rounded-md hover:bg-green-200 dark:hover:bg-green-800 text-sm"><span className="block font-bold text-gray-800 dark:text-gray-200">{formatOdds(game.odds.draw)}</span><span className="text-xs text-gray-500">Draw</span></button>)}
                <button className={`bg-gray-200 dark:bg-gray-700 p-2 rounded-md hover:bg-green-200 dark:hover:bg-green-800 text-sm ${!game.odds.draw ? 'col-start-3' : ''}`}><span className="block font-bold text-gray-800 dark:text-gray-200">{formatOdds(game.odds.team2)}</span><span className="text-xs text-gray-500">{game.team2}</span></button>
            </div>
        </div>
    </div>
);

export default LiveGameCard;