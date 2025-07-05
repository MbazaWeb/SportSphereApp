import React, { useState } from 'react';
import { Share2, ArrowLeft, Edit, MapPin, Calendar as CalendarIcon, Link as LinkIcon, Plus, X, Award } from 'lucide-react';
import VerifiedBadge from '../badges/VerifiedBadge';
import FanBadge from '../badges/FanBadge';

const ProfilePage = ({ user, onClose, onUserClick, onEditProfile, onFollowToggle, isFollowingUser, usersData, onInteraction }) => {
    if (!user) return null;
    const [showShareConfirmation, setShowShareConfirmation] = useState(false);

    const handleShare = async () => {
        const shareData = { title: `${user.user}'s SportSphere Profile`, text: `Check out ${user.user}'s profile on SportSphere!`, url: window.location.href };
        const showConfirmation = () => { setShowShareConfirmation(true); setTimeout(() => setShowConfirmation(false), 2000); };
        try {
            if (navigator.share) { await navigator.share(shareData); } else { throw new Error("Web Share API not supported"); }
        } catch (err) {
            try { await navigator.clipboard.writeText(shareData.url); showConfirmation(); } catch (clipErr) { console.error("Clipboard API failed:", clipErr); }
        }
        onInteraction(); // Call onInteraction for fan badge logic
    };

    const renderRoleSpecificProfile = () => {
        switch (user.role) {
            case 'team':
                return (
                    <div className="mt-6 space-y-4">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Team Profile</h3>
                        <p className="text-gray-700 dark:text-gray-300"><strong>History:</strong> {user.history}</p>
                        <div>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Achievements:</p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                                {user.achievements?.map((ach, i) => <li key={i}>{ach}</li>)}
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Stats:</p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                                {user.teamStats && Object.entries(user.teamStats).map(([key, value]) => (
                                    <li key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}: {value}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                );
            case 'player':
                return (
                    <div className="mt-6 space-y-4">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Player Profile</h3>
                        <p className="text-gray-700 dark:text-gray-300"><strong>Current Team:</strong> {user.currentTeam}</p>
                        <div>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Details:</p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                                {user.playerDetails && Object.entries(user.playerDetails).map(([key, value]) => (
                                    <li key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}: {value}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Match Stats:</p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                                {user.matchStats && Object.entries(user.matchStats).map(([key, value]) => (
                                    <li key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}: {value}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Achievements:</p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                                {user.achievements?.map((ach, i) => <li key={i}>{ach}</li>)}
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Achievement Percentages:</p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                                {user.achievementsPercentage && Object.entries(user.achievementsPercentage).map(([key, value]) => (
                                    <li key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}: {value}</li>
                                ))}
                            </ul>
                        </div>
                        {user.sponsors && user.sponsors.length > 0 && (
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">Sponsors:</p>
                                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                                    {user.sponsors.map((sponsor, i) => <li key={i}>{sponsor}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                );
            case 'analyst':
            case 'reporter':
                return (
                    <div className="mt-6 space-y-4">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Professional Profile</h3>
                        <p className="text-gray-700 dark:text-gray-300"><strong>Background:</strong> {user.background}</p>
                        {user.company && <p className="text-gray-700 dark:text-gray-300"><strong>Company:</strong> {user.company}</p>}
                        <div>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Stats:</p>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                                {user.reporterStats && Object.entries(user.reporterStats).map(([key, value]) => (
                                    <li key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}: {value}</li>
                                ))}
                                {user.analystStats && Object.entries(user.analystStats).map(([key, value]) => (
                                    <li key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}: {value}</li>
                                ))}
                            </ul>
                        </div>
                        {user.sponsors && user.sponsors.length > 0 && (
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">Sponsors:</p>
                                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                                    {user.sponsors.map((sponsor, i) => <li key={i}>{sponsor}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                );
            case 'sponsor':
                return (
                    <div className="mt-6 space-y-4">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Sponsor Profile</h3>
                        <p className="text-gray-700 dark:text-gray-300"><strong>Company:</strong> {user.company}</p>
                        <p className="text-gray-700 dark:text-gray-300"><strong>Background:</strong> {user.background}</p>
                        {user.sponsors && user.sponsors.length > 0 && (
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">Sponsored Entities:</p>
                                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                                    {user.sponsors.map((sponsor, i) => <li key={i}>{sponsor}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                );
            case 'fan':
                return (
                    <div className="mt-6 space-y-4">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Fan Activity</h3>
                        <p className="text-gray-700 dark:text-gray-300"><strong>Interactions:</strong> {user.interactions || 0}</p>
                        {user.interactions >= 5 && (
                            <p className="text-green-600 dark:text-green-400 font-semibold flex items-center">
                                <Award size={20} className="mr-2" /> General Fan Badge Granted!
                            </p>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-50 dark:bg-black z-40 overflow-y-auto">
            {showShareConfirmation && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white px-4 py-2 rounded-lg z-50">Link Copied!</div>}
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg my-8">
                <div className="relative">
                    <img src={user.cover} alt="Cover" className="w-full h-48 object-cover rounded-t-lg" />
                    <div className="absolute -bottom-16 left-4">
                        <img src={user.avatar} alt={user.user} className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg" />
                    </div>
                </div>
                <div className="p-4 pt-20">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                                {user.user}
                                {user.verificationTier && <VerifiedBadge tier={user.verificationTier} />}
                                {user.role === 'fan' && user.interactions >= 5 && <FanBadge />}
                            </h2>
                            {user.handle && <p className="text-gray-500 dark:text-gray-400 text-lg">@{user.handle}</p>}
                        </div>
                        <div className="flex space-x-2">
                            {user.id === 'currentuser' ? (
                                <button
                                    onClick={() => onEditProfile(user)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors flex items-center"
                                >
                                    <Edit size={18} className="mr-2" /> Edit Profile
                                </button>
                            ) : (
                                <button
                                    onClick={() => onFollowToggle(user.id)}
                                    className={`px-4 py-2 rounded-full transition-colors flex items-center ${isFollowingUser(user.id) ? 'bg-gray-300 text-gray-800 hover:bg-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                                >
                                    {isFollowingUser(user.id) ? <X size={18} className="mr-2" /> : <Plus size={18} className="mr-2" />}
                                    {isFollowingUser(user.id) ? 'Unfollow' : 'Follow'}
                                </button>
                            )}
                            <button
                                onClick={handleShare}
                                className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors flex items-center"
                            >
                                <Share2 size={18} className="mr-2" /> Share
                            </button>
                            <button
                                onClick={onClose}
                                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition-colors flex items-center"
                            >
                                <ArrowLeft size={18} className="mr-2" /> Back
                            </button>
                        </div>
                    </div>

                    <p className="mt-4 text-gray-700 dark:text-gray-300">{user.bio}</p>
                    <div className="mt-4 flex flex-wrap items-center text-gray-600 dark:text-gray-400 text-sm">
                        {user.location && <span className="flex items-center mr-4"><MapPin size={16} className="mr-1" />{user.location}</span>}
                        {user.joined && <span className="flex items-center mr-4"><CalendarIcon size={16} className="mr-1" />Joined {user.joined}</span>}
                        {user.website && <a href={user.website} target="_blank" rel="noopener noreferrer" className="flex items-center mr-4 hover:underline text-blue-500"><LinkIcon size={16} className="mr-1" />{user.website.replace(/^(https?:\/\/)?(www\.)?/, '')}</a>}
                    </div>

                    <div className="mt-6 flex space-x-6 text-gray-800 dark:text-gray-200">
                        <div className="text-center"><p className="font-bold text-lg">{user.stats?.posts || '0'}</p><p className="text-sm text-gray-500">Posts</p></div>
                        <div className="text-center"><p className="font-bold text-lg">{user.stats?.followers || '0'}</p><p className="text-sm text-gray-500">Followers</p></div>
                        <div className="text-center"><p className="font-bold text-lg">{user.stats?.following || '0'}</p><p className="text-sm text-gray-500">Following</p></div>
                    </div>

                    {renderRoleSpecificProfile()}

                    <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">{user.user}'s Latest Posts</h3>
                        <p className="text-gray-500 dark:text-gray-400">Posts for this user will appear here (requires further Firestore integration).</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;