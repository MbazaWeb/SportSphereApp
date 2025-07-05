import React from 'react';
import { Heart } from 'lucide-react';

const FanBadge = () => (
    <span className="relative group inline-flex items-center align-middle">
        <span className="w-5 h-5 rounded-full flex items-center justify-center bg-purple-500 ml-1.5">
            <Heart size={16} className="text-white" />
        </span>
        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block px-2 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap z-10">
            General Fan Badge
        </span>
    </span>
);

export default FanBadge;