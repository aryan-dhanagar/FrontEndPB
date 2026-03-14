import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const CartPage = () => {
    const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();
    const navigate = useNavigate();
    const deliveryFee = cartTotal >= 30 ? 0 : 4.99;

    if (cartCount === 0) {
        return (
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-300 mx-auto mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    <h1 className="font-display text-3xl text-[#1a1a1a] mb-3">Your Cart is Empty</h1>
                    <p className="text-gray-400 mb-8">Looks like you haven't added any bowls yet.</p>
                    <Link
                        to="/"
                        className="inline-block bg-[#1a1a1a] text-white font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-2xl hover:bg-[#333] transition-colors"
                    >
                        Browse Menu
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
            <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-3xl sm:text-4xl text-[#1a1a1a] mb-10"
            >
                Your <em className="italic">Cart</em>
            </motion.h1>

            <div className="flex flex-col lg:flex-row gap-10">
                {/* Cart Items */}
                <div className="flex-1">
                    <AnimatePresence>
                        {cartItems.map((item, i) => (
                            <motion.div
                                key={item._id || item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20, height: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center gap-4 sm:gap-6 py-6 border-b border-gray-100"
                            >
                                {/* Image */}
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl flex-shrink-0"
                                />

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-[#1a1a1a] text-[15px] truncate">{item.name}</h3>
                                    <p className="text-[#d4912a] font-bold text-[15px] mt-1">₹{item.price.toFixed(2)}</p>
                                </div>

                                {/* Quantity */}
                                <div className="flex items-center gap-0 border border-gray-200 rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)}
                                        className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors text-lg"
                                    >
                                        −
                                    </button>
                                    <span className="w-9 h-9 flex items-center justify-center font-bold text-sm text-[#1a1a1a]">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}
                                        className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors text-lg"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Subtotal */}
                                <p className="font-bold text-[#1a1a1a] text-[15px] w-16 text-right hidden sm:block">
                                    ₹{(item.price * item.quantity).toFixed(2)}
                                </p>

                                {/* Remove */}
                                <button
                                    onClick={() => removeFromCart(item._id || item.id)}
                                    className="text-gray-300 hover:text-red-400 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Order Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:w-[380px] flex-shrink-0"
                >
                    <div className="bg-[#faf8f5] rounded-3xl p-6 sm:p-8 border border-[#e8e3dc] sticky top-28">
                        <h2 className="font-bold text-lg text-[#1a1a1a] mb-6">Order Summary</h2>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal ({cartCount} items)</span>
                                <span className="font-semibold text-[#1a1a1a]">₹{cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Delivery</span>
                                <span className={`font-semibold ${deliveryFee === 0 ? 'text-green-600' : 'text-[#1a1a1a]'}`}>
                                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(2)}`}
                                </span>
                            </div>
                            {deliveryFee > 0 && (
                                <p className="text-xs text-[#d4912a]">
                                    Add ₹{(30 - cartTotal).toFixed(2)} more for free delivery!
                                </p>
                            )}
                            <div className="border-t border-[#e8e3dc] pt-3 flex justify-between">
                                <span className="font-black text-[#1a1a1a]">Total</span>
                                <span className="font-black text-lg text-[#1a1a1a]">
                                    ₹{(cartTotal + deliveryFee).toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/checkout')}
                            className="w-full mt-6 bg-[#1a1a1a] text-white font-bold text-sm uppercase tracking-wider py-4 rounded-2xl hover:bg-[#333] transition-colors"
                        >
                            Proceed to Checkout
                        </button>

                        <Link to="/" className="block text-center mt-4 text-xs text-gray-400 hover:text-gray-600 transition-colors">
                            ← Continue Shopping
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CartPage;
