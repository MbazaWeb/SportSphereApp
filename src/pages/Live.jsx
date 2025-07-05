import React, { useState, useEffect } from 'react';
import LiveGameCard from '../components/live/LiveGameCard';
import LiveBettingCard from '../components/live/LiveBettingCard';
import LiveMatchScreen from '../components/live/LiveMatchScreen';
import { initialLiveGames, mockLiveBets } from '../data/mockData';
import { formatOdds } from '../utils/formatters';

const LiveTab = ({ onGameClick, onBettingCardClick }) => {
    const [liveGames, setLiveGames] = useState(initialLiveGames);
    const [liveBets, setLiveBets] = useState(mockLiveBets);
    const [viewingLiveMatch, setViewingLiveMatch] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setLiveGames(prevGames =>
                prevGames.map(game => {
                    const newOdds = { ...game.odds };
                    for (const key in newOdds) { if (typeof newOdds[key] === 'number') { const change = (Math.random() - 0.5) * (key === 'total' ? 1 : 20); newOdds[key] = Math.round(newOdds[key] + change); } }
                    return { ...game, score1: game.score1 + (Math.random() > 0.9 ? 1 : 0), score2: game.score2 + (Math.random() > 0.9 ? 1 : 0), odds: newOdds, };
                })
            );
            setLiveBets(prevBets =>
                prevBets.map(bet => {
                    const newOptions = bet.options.map(option => ({
                        ...option,
                        odds: option.odds + (Math.random() - 0.5) * 5
                    }));
                    const newAllMarkets = bet.allMarkets.map(market => ({
                        ...market,
                        options: market.options.map(option => ({
                            ...option,
                            odds: option.odds + (Math.random() - 0.5) * 5
                        }))
                    }));
                    return { ...bet, options: newOptions, allMarkets: newAllMarkets };
                })
            );
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-4 pt-6 bg-gray-50 dark:bg-black">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 max-w-lg mx-auto">Live Now</h2>
            {liveGames.map(game => (
                <LiveGameCard key={game.id} game={game} onClick={() => setViewingLiveMatch(game)} />
            ))}

            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 mt-8 max-w-lg mx-auto">Live Betting</h2>
            {liveBets.map(bet => <LiveBettingCard key={bet.id} bet={bet} onClick={onBettingCardClick} />)}

            {viewingLiveMatch && <LiveMatchScreen match={viewingLiveMatch} onClose={() => setViewingLiveMatch(null)} />}
        </div>
    );
};

export default LiveTab;