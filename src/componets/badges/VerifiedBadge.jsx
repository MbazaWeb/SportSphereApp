import React from 'react';
import { UserCheck, Shield, Star, Mic, Heart, Clipboard, Briefcase, BarChart3 } from 'lucide-react';
import { verificationTiers } from '../../data/verificationTiers';

const VerifiedBadge = ({ tier }) => {
    if (!tier || !verificationTiers[tier]) return null;
    const { label, icon, color } = verificationTiers[tier];
    return (
        <span className="relative group inline-flex items-center align-middle">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center ${color} ml-1.5`}>
                {icon}
            </span>
            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block px-2 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap z-10">
                {label}
            </span>
        </span>
    );
};

export default VerifiedBadge;