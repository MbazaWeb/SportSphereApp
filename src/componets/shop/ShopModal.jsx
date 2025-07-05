import React, { useState } from 'react';
import { X } from 'lucide-react';

const ShopModal = ({ item, onClose, onAddToCart }) => {
    if (!item) return null;
    const [details, setDetails] = useState({
        color: item.colors ? item.colors[0] : null,
        size: item.sizes ? item.sizes[0] : null,
        ticketType: item.type === 'ticket' ? 'Regular' : null,
        membershipTier: item.membershipTiers ? item.membershipTiers[0] : null,
    });

    const handleDetailChange = (type, value) => {
        setDetails(prev => ({ ...prev, [type]: value }));
    };

    const handleAddToCart = () => {
        onAddToCart(item, details);
        onClose();
    };

    const getPrice = () => {
        if (item.type === 'ticket') return item.price[details.ticketType];
        if (item.type === 'membership') return details.membershipTier.price;
        return item.price || item.offerPrice;
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md m-4 relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:text-gray-400"><X size={24} /></button>
                <div className="p-6">
                    <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">{item.name}</h3>
                    <img src={item.image} alt={item.name} className="w-full h-64 object-cover rounded-md mb-4" />
                    
                    {item.type === 'merchandise' && (<>
                        <div className="mb-4"><label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Color:</label><select onChange={(e) => handleDetailChange('color', e.target.value)} className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 mt-1">{item.colors.map(color => <option key={color} value={color}>{color}</option>)}</select></div>
                        <div className="mb-6"><label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Size:</label><select onChange={(e) => handleDetailChange('size', e.target.value)} className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 mt-1">{item.sizes.map(size => <option key={size} value={size}>{size}</option>)}</select></div>
                    </>)}

                    {item.type === 'ticket' && (<div className="mb-6"><label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ticket Type:</label><select onChange={(e) => handleDetailChange('ticketType', e.target.value)} className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 mt-1"><option value="Regular">Regular - TSh {item.price.Regular.toLocaleString()}</option><option value="VIP">VIP - TSh {item.price.VIP.toLocaleString()}</option></select></div>)}
                    
                    {item.type === 'membership' && (<div className="mb-6"><label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Membership Tier:</label><select onChange={(e) => handleDetailChange('membershipTier', item.membershipTiers.find(t => t.name === e.target.value))} className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 mt-1">{item.membershipTiers.map(tier => <option key={tier.name} value={tier.name}>{tier.name} ({tier.duration}) - TSh {tier.price.toLocaleString()}</option>)}</select></div>)}

                    <button onClick={handleAddToCart} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 w-full">Add to Cart (TSh {getPrice().toLocaleString()})</button>
                </div>
            </div>
        </div>
    );
};

export default ShopModal;