import React from 'react';
import { Bell, Mail, Trophy } from 'lucide-react';

const Header = ({ isSidebarOpen }) => {
    return (
        <header className="bg-white dark:bg-black h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800 z-20 flex-shrink-0 md:hidden">
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-orange-400">SportSphere</h1>
            <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <Bell size={24} />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <Mail size={24} />
                </button>
            </div>
        </header>
    );
};

export default Header;