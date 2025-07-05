import React from 'react';
import { formatOdds } from '../../utils/formatters';

const LiveBettingCard = ({ bet, onClick }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4 max-w-lg mx-auto overflow-hidden border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-purple-500" onClick={() => onClick(bet)}>
        <div className="p-4">
            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span>{bet.sport} - {bet.match}</span>
                <span className="font-bold text-purple-500">{bet.time} Betting</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">{bet.market}</h3>
            <div className="grid grid-cols-2 gap-2 text-center">
                {bet.options.map((option, index) => (
                    <button key={index} className="bg-gray-200 dark:bg-gray-700 p-3 rounded-md hover:bg-purple-200 dark:hover:bg-purple-800 text-sm flex flex-col items-center justify-center">
                        <span className="block font-bold text-gray-800 dark:text-gray-200">{formatOdds(option.odds)}</span>
                        <span className="text-xs text-gray-500">{option.player}</span>
                    </button>
                ))}
            </div>
        </div>
    </div>
);

export default LiveBettingCard;