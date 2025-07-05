import React, { useState } from 'react';
import { X } from 'lucide-react';
import { formatOdds } from '../../utils/formatters';

const LiveBettingModal = ({ bet, onClose, showAlert }) => {
    if (!bet) return null;
    const [selectedOption, setSelectedOption] = useState(null);
    const [betAmount, setBetAmount] = useState('');

    const handlePlaceBet = () => {
        if (!selectedOption || betAmount <= 0) {
            showAlert('Please select an option and enter a valid bet amount.', 'error');
            return;
        }
        showAlert(`Bet placed: TSh ${betAmount} on ${selectedOption.name || selectedOption.player} (${formatOdds(selectedOption.odds)}) for ${bet.match}`, 'success');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md m-4" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">Live Betting: {bet.match}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"><X size={24} /></button>
                </div>
                <div className="p-4 max-h-[70vh] overflow-y-auto">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Market: <span className="font-semibold text-purple-600">{bet.market}</span></p>

                    {bet.allMarkets.map((market, index) => (
                        <div key={index} className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                            <h3 className="font-bold text-md mb-2">{market.name}</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {market.options.map((option, optIndex) => (
                                    <button
                                        key={optIndex}
                                        onClick={() => setSelectedOption(option)}
                                        className={`p-3 rounded-md border text-sm flex flex-col items-center justify-center transition-all ${selectedOption?.name === option.name && selectedOption?.player === option.player ? 'bg-purple-600 text-white border-purple-700' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                    >
                                        <span className="font-bold">{option.name || option.player}</span>
                                        <span className="text-xs">{formatOdds(option.odds)}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="mt-4">
                        <label htmlFor="bet-amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bet Amount (TSh)</label>
                        <input
                            type="number"
                            id="bet-amount"
                            value={betAmount}
                            onChange={(e) => setBetAmount(e.target.value)}
                            placeholder="e.g., 10000"
                            className="w-full p-3 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-gray-200"
                        />
                    </div>
                </div>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <button
                        onClick={handlePlaceBet}
                        className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!selectedOption || betAmount <= 0}
                    >
                        Place Bet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LiveBettingModal;