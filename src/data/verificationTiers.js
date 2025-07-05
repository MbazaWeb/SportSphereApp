import React from 'react';
import { UserCheck, Shield, Star, Mic, Heart, Clipboard, Briefcase, BarChart3 } from 'lucide-react';

export const verificationTiers = {
    player: { label: 'Verified Player', icon: <UserCheck size={16} className="text-white" />, color: 'bg-blue-500' },
    team: { label: 'Official Team', icon: <Shield size={16} className="text-white" />, color: 'bg-red-600' },
    sponsor: { label: 'Official Sponsor', icon: <Star size={16} className="text-white" />, color: 'bg-yellow-500' },
    reporter: { label: 'Verified Reporter', icon: <Mic size={16} className="text-white" />, color: 'bg-purple-600' },
    fan: { label: 'Verified Fan', icon: <Heart size={16} className="text-white" />, color: 'bg-pink-500' },
    coach: { label: 'Verified Coach', icon: <Clipboard size={16} className="text-white" />, color: 'bg-green-600' },
    manager: { label: 'Team Manager', icon: <Briefcase size={16} className="text-white" />, color: 'bg-indigo-600' },
    analyst: { label: 'Sports Analyst', icon: <BarChart3 size={16} className="text-white" />, color: 'bg-teal-500' },
};