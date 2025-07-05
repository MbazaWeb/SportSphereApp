import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // If using React Router

const NavItem = ({ icon, label, tabName, activeTab, setActiveTab }) => {
    // If not using React Router, simply use onClick directly:
    const handleClick = () => {
        if (setActiveTab) {
            setActiveTab(tabName);
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${activeTab === tabName ? 'bg-gray-200 dark:bg-gray-700 font-bold' : 'text-gray-600 dark:text-gray-300'}` + (tabName === 'OnlineShop' || tabName === 'Orders' ? ' hidden md:flex' : '') + ` hover:bg-gray-200 dark:hover:bg-gray-700`}
        >
            {React.cloneElement(icon, { strokeWidth: activeTab === tabName ? 2.5 : 2 })}
            <span className="ml-4 font-semibold">{label}</span>
        </button>
    );
};

export default NavItem;