import React from 'react';

const ChannelMessageCard = ({ message }) => (
    <div className={`flex items-end mb-4 ${message.isUserMessage ? 'justify-end' : 'justify-start'}`}>
        {!message.isUserMessage && <img src={message.avatar} alt={message.sender} className="w-8 h-8 rounded-full mr-2 flex-shrink-0" />}
        <div className={`p-3 rounded-xl shadow-md ${message.isUserMessage ? 'bg-green-500 text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'} max-w-[80%]`}>
            {!message.isUserMessage && <p className="font-semibold text-sm mb-1">{message.sender}</p>}
            <p className="text-sm">{message.message}</p>
            <p className="text-xs text-right mt-1 opacity-80">{message.time}</p>
        </div>
        {message.isUserMessage && <img src={message.avatar} alt={message.sender} className="w-8 h-8 rounded-full ml-2 flex-shrink-0" />}
    </div>
);

export default ChannelMessageCard;