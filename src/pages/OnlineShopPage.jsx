import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, ArrowLeft } from 'lucide-react';
import ShopProductCard from '../components/shop/ShopProductCard';
import ShopModal from '../components/shop/ShopModal';
import PaymentModal from '../components/shop/PaymentModal';
import { shopTeams, shopMatches, shopProducts, azamTvData, bestOffers, getTeamName } from '../data/mockData';

const OnlineShopPage = ({ showAlert, onPaymentSuccess }) => {
    const [activeTab, setActiveTab] = useState('merchandise');
    const [cart, setCart] = useState([]);
    const [view, setView] = useState('shop');
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    useEffect(() => {
        const savedCart = localStorage.getItem('sportSphereCart');
        if (savedCart) setCart(JSON.parse(savedCart));
    }, []);

    useEffect(() => {
        localStorage.setItem('sportSphereCart', JSON.stringify(cart));
    }, [cart]);

    const handleAddToCart = (item, details) => {
        let price, uniqueId, name;
        if (item.type === 'ticket') {
            price = item.price[details.ticketType];
            name = `${item.name} (${details.ticketType})`;
            uniqueId = `${item.id}-${details.ticketType}`;
        } else if (item.type === 'membership') {
            price = details.membershipTier.price;
            name = `${item.name} Membership (${details.membershipTier.name})`;
            uniqueId = `${item.id}-${details.membershipTier.name}`;
        } else if (item.type === 'azam_hardware' || item.type === 'azam_subscription') {
            price = item.price;
            name = item.name;
            uniqueId = item.id;
        } else { // merchandise or offer
            price = item.price || item.offerPrice;
            name = item.name;
            uniqueId = `${item.id}-${details.color}-${details.size}`;
        }
        
        const existingItem = cart.find(cartItem => cartItem.uniqueId === uniqueId);
        if (existingItem) {
            setCart(cart.map(cartItem => cartItem.uniqueId === uniqueId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem));
        } else {
            setCart([...cart, { ...item, ...details, price, name, quantity: 1, uniqueId }]);
        }
        showAlert(`${name} added to cart!`, 'success');
    };

    const updateCartQuantity = (uniqueId, change) => {
        setCart(currentCart => {
            const itemToUpdate = currentCart.find(item => item.uniqueId === uniqueId);
            if (itemToUpdate.quantity + change <= 0) return currentCart.filter(item => item.uniqueId !== uniqueId);
            return currentCart.map(item => item.uniqueId === uniqueId ? { ...item, quantity: item.quantity + change } : item);
        });
    };

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    const renderShopContent = () => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        switch (activeTab) {
            case 'merchandise':
            case 'ticket':
                const products = shopProducts.filter(p => p.type === activeTab && p.name.toLowerCase().includes(lowerSearchTerm));
                return products.map(p => <ShopProductCard key={p.id} product={p} onProductClick={setSelectedItem} />);
            case 'membership':
                const teams = shopTeams.filter(t => t.name.toLowerCase().includes(lowerSearchTerm));
                return teams.map(team => <ShopProductCard key={team.id} product={{...team, type:'membership', membershipTiers: team.membershipTiers}} onProductClick={(item) => setSelectedItem(item)} />);
            case 'azamtv':
                const azamItems = [...azamTvData.hardware.map(h => ({...h, type: 'azam_hardware'})), ...azamTvData.subscriptions.map(s => ({...s, type: 'azam_subscription', image: 'https://placehold.co/400x400/00aef0/ffffff?text=Subscription'}))];
                return azamItems.filter(p => p.name.toLowerCase().includes(lowerSearchTerm)).map(p => <ShopProductCard key={p.id} product={p} onProductClick={setSelectedItem} />);
            case 'offers':
                return bestOffers.filter(p => p.name.toLowerCase().includes(lowerSearchTerm)).map(p => <ShopProductCard key={p.id} product={{...p, type: 'offer'}} onProductClick={setSelectedItem} isOffer={true} />);
            default:
                return <p>No items found.</p>;
        }
    };

    const ShopTabView = () => (
        <>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Online Shop</h2>
                <button onClick={() => setView('cart')} className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <ShoppingCart size={24} />
                    {cart.length > 0 && <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>}
                </button>
            </div>
            <div className="mb-6">
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-100 dark:bg-gray-700 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex items-center bg-gray-100 dark:bg-gray-900 rounded-md p-1 flex-wrap">
                    {['merchandise', 'membership', 'ticket', 'azamtv', 'offers'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 p-2 rounded-md font-semibold text-sm capitalize ${activeTab === tab ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300'}`}
                        >
                            {tab.replace('azamtv', 'AzamTV')}
                        </button>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {renderShopContent()}
            </div>
        </>
    );

    const CartView = () => (
        <>
            <div className="flex items-center mb-6">
                <button onClick={() => setView('shop')} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 mr-4">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Your Cart</h2>
            </div>
            {cart.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
                <div>
                    {cart.map(item => (
                        <div key={item.uniqueId} className="flex items-center justify-between py-4 border-b dark:border-gray-700">
                            <div className="flex items-center gap-4">
                                <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded-md" />
                                <div>
                                    <p className="font-bold text-gray-800 dark:text-gray-200">{item.name}</p>
                                    <p className="text-sm text-gray-500">TSh {item.price.toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border rounded-md dark:border-gray-600">
                                    <button onClick={() => updateCartQuantity(item.uniqueId, -1)} className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700">-</button>
                                    <span className="px-4">{item.quantity}</span>
                                    <button onClick={() => updateCartQuantity(item.uniqueId, 1)} className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700">+</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="mt-6 text-right">
                        <p className="text-xl font-bold">Total: <span className="text-blue-600">TSh {cartTotal.toLocaleString()}</span></p>
                        <button onClick={() => setShowPaymentModal(true)} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg mt-4 hover:bg-blue-700">Proceed to Checkout</button>
                    </div>
                </div>
            )}
        </>
    );

    return (
        <div className="p-4 pt-6 bg-gray-50 dark:bg-black h-full text-gray-800 dark:text-gray-200">
            <div className="max-w-6xl mx-auto">
                {view === 'shop' ? <ShopTabView /> : <CartView />}
            </div>
            {selectedItem && <ShopModal item={selectedItem} onClose={() => setSelectedItem(null)} onAddToCart={handleAddToCart} />}
            {showPaymentModal && (
                <PaymentModal
                    cartItems={cart}
                    totalAmount={cartTotal}
                    onClose={() => setShowPaymentModal(false)}
                    onPaymentSuccess={(order) => {
                        onPaymentSuccess(order);
                        setCart([]);
                        setShowPaymentModal(false);
                        setView('shop');
                    }}
                    showAlert={showAlert}
                />
            )}
        </div>
    );
};

export default OnlineShopPage;