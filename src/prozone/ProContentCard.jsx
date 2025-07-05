import React from 'react';
import { Briefcase } from 'lucide-react';

const ProContentCard = ({ item }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4 p-4 flex items-start max-w-lg mx-auto border border-gray-200 dark:border-gray-700">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center mr-4"><Briefcase className="text-gray-500" /></div>
        <div className="flex-grow"><h3 className="font-bold text-blue-600 dark:text-blue-400">{item.title}</h3><p className="text-gray-800 dark:text-gray-200">{item.team || item.company}</p><p className="text-gray-500 dark:text-gray-400 text-sm">{item.location} ({item.type})</p></div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors text-sm">View</button>
    </div>
);

export default ProContentCard;