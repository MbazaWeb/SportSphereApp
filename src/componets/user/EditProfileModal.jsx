import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { verificationTiers } from '../../data/verificationTiers';

const EditProfileModal = ({ user, onClose, onSave, showAlert }) => {
    const [formData, setFormData] = useState({
        user: '',
        bio: '',
        location: '',
        website: '',
        avatar: '',
        cover: '',
        role: 'fan',
        // Role-specific fields
        currentTeam: '', // Player
        history: '', // Team
        achievements: [], // Player, Team
        background: '', // Analyst, Reporter, Sponsor
        company: '', // Analyst, Reporter, Sponsor
    });

    useEffect(() => {
        if (user) {
            setFormData({
                user: user.user || '',
                bio: user.bio || '',
                location: user.location || '',
                website: user.website || '',
                avatar: user.avatar || '',
                cover: user.cover || '',
                role: user.role || 'fan',
                currentTeam: user.currentTeam || '',
                history: user.history || '',
                achievements: user.achievements || [],
                background: user.background || '',
                company: user.company || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAchievementsChange = (e, index) => {
        const newAchievements = [...formData.achievements];
        newAchievements[index] = e.target.value;
        setFormData(prev => ({ ...prev, achievements: newAchievements }));
    };

    const addAchievementField = () => {
        setFormData(prev => ({ ...prev, achievements: [...prev.achievements, ''] }));
    };

    const handleSubmit = () => {
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md transform transition-all scale-100 opacity-100 animate-fade-in-up">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Edit Profile</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                    <div>
                        <label htmlFor="user" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Display Name</label>
                        <input type="text" id="user" name="user" value={formData.user} onChange={handleChange} className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200" />
                    </div>
                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                        <textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} rows="3" className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 resize-y"></textarea>
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                        <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200" />
                    </div>
                    <div>
                        <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website</label>
                        <input type="text" id="website" name="website" value={formData.website} onChange={handleChange} className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200" />
                    </div>
                    <div>
                        <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Avatar URL</label>
                        <input type="text" id="avatar" name="avatar" value={formData.avatar} onChange={handleChange} className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200" />
                    </div>
                    <div>
                        <label htmlFor="cover" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cover Image URL</label>
                        <input type="text" id="cover" name="cover" value={formData.cover} onChange={handleChange} className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200" />
                    </div>

                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                        <select id="role" name="role" value={formData.role} onChange={handleChange} className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200">
                            {Object.keys(verificationTiers).map(tier => (
                                <option key={tier} value={tier}>{verificationTiers[tier].label}</option>
                            ))}
                        </select>
                    </div>

                    {formData.role === 'player' && (
                        <div>
                            <label htmlFor="currentTeam" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Team</label>
                            <input type="text" id="currentTeam" name="currentTeam" value={formData.currentTeam} onChange={handleChange} className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200" />
                        </div>
                    )}
                    {formData.role === 'team' && (
                        <div>
                            <label htmlFor="history" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Team History</label>
                            <textarea id="history" name="history" value={formData.history} onChange={handleChange} rows="3" className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 resize-y"></textarea>
                        </div>
                    )}
                    {(formData.role === 'analyst' || formData.role === 'reporter' || formData.role === 'sponsor') && (
                        <>
                            <div>
                                <label htmlFor="background" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Background</label>
                                <textarea id="background" name="background" value={formData.background} onChange={handleChange} rows="3" className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 resize-y"></textarea>
                            </div>
                            <div>
                                <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company</label>
                                <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200" />
                            </div>
                        </>
                    )}

                    {(formData.role === 'player' || formData.role === 'team') && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Achievements</label>
                            {formData.achievements.map((ach, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    value={ach}
                                    onChange={(e) => handleAchievementsChange(e, index)}
                                    className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 mb-2"
                                    placeholder={`Achievement ${index + 1}`}
                                />
                            ))}
                            <button type="button" onClick={addAchievementField} className="text-blue-500 text-sm font-semibold hover:underline mt-1">+ Add Achievement</button>
                        </div>
                    )}

                </div>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-colors shadow-lg"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;