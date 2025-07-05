import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-black text-gray-600 dark:text-gray-300 py-6 text-center border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-3">
                    <a href="#" className="hover:underline">Contact Us</a>
                    <a href="#" className="hover:underline">About Us</a>
                    <a href="#" className="hover:underline">Follow Us</a>
                </div>
                <p className="text-sm">Developed by: David Mbazza</p>
            </div>
        </footer>
    );
};

export default Footer;