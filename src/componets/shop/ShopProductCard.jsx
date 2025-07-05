import React from 'react';

const ShopProductCard = ({ product, onProductClick, isOffer = false }) => {
    let priceDisplay;
    if (product.type === 'membership') {
        priceDisplay = 'Various Tiers';
    } else if (product.offerPrice !== undefined && product.offerPrice !== null) {
        priceDisplay = `TSh ${product.offerPrice.toLocaleString()}`;
    } else if (product.price !== undefined && product.price !== null) {
        if (typeof product.price === 'object' && product.price.Regular !== undefined && product.price.Regular !== null) {
            priceDisplay = `From TSh ${product.price.Regular.toLocaleString()}`;
        } else if (typeof product.price === 'number') {
            priceDisplay = `TSh ${product.price.toLocaleString()}`;
        } else {
            priceDisplay = 'Price N/A';
        }
    } else {
        priceDisplay = 'Price N/A';
    }
    const offerPriceDisplay = `TSh ${product.offerPrice?.toLocaleString()}`;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col text-center transition-transform hover:scale-105 cursor-pointer relative" onClick={() => onProductClick(product)}>
            {isOffer && <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">PROMOTION!</span>}
            <img src={product.image} alt={product.name} className="h-48 w-full object-cover mb-4 rounded-md" />
            <h4 className="font-bold text-md flex-grow text-gray-800 dark:text-gray-200">{product.name}</h4>
            {isOffer && product.originalPrice && <p className="text-sm text-gray-500 line-through">TSh {product.originalPrice.toLocaleString()}</p>}
            <p className="text-lg font-semibold text-blue-600 my-2">{isOffer ? offerPriceDisplay : priceDisplay}</p>
            <button className="bg-blue-600 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-700 font-semibold w-full">View Details</button>
        </div>
    );
};

export default ShopProductCard;