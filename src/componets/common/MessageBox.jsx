import React from 'react';

const MessageBox = ({ message, type, onClose }) => {
    let bgColor = '';
    let textColor = '';
    switch (type) {
        case 'success':
            bgColor = 'bg-green-500';
            textColor = 'text-white';
            break;
        case 'error':
            bgColor = 'bg-red-500';
            textColor = 'text-white';
            break;
        case 'info':
        default:
            bgColor = 'bg-blue-500';
            textColor = 'text-white';
            break;
    }

    return (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
            <div className={`${bgColor} ${textColor} p-6 rounded-lg shadow-lg max-w-sm w-full flex flex-col items-center space-y-4`}>
                <p className="text-lg font-semibold text-center">{message}</p>
                <button
                    onClick={onClose}
                    className="bg-white text-gray-800 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default MessageBox;