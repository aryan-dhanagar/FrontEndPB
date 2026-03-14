import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getOrderHistory } from '../services/api';

const statusColors = {
    placed: 'bg-blue-100 text-blue-700',
    confirmed: 'bg-indigo-100 text-indigo-700',
    preparing: 'bg-amber-100 text-amber-700',
    out_for_delivery: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
};

const statusLabels = {
    placed: 'Placed',
    confirmed: 'Confirmed',
    preparing: 'Preparing',
    out_for_delivery: 'On the Way',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
};

const OrderHistory = () => {
    const { user, isLoggedIn, openLogin } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user?.email) {
                setLoading(false);
                return;
            }
            try {
                const data = await getOrderHistory(user.email);
                setOrders(data);
            } catch (err) {
                console.error('Failed to fetch orders:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [user]);

    if (!isLoggedIn) {
        return (
            <div className="max-w-[600px] mx-auto px-4 py-20 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-300 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                    <h1 className="font-display text-3xl text-[#1a1a1a] mb-3">My Orders</h1>
                    <p className="text-gray-400 text-sm mb-6">Sign in to view your order history</p>
                    <button
                        onClick={() => openLogin('login')}
                        className="inline-block bg-[#1a1a1a] text-white font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-2xl hover:bg-[#333] transition-colors"
                    >
                        Sign In
                    </button>
                </motion.div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="max-w-[600px] mx-auto px-4 py-20 text-center">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-[#1a1a1a] rounded-full animate-spin mx-auto" />
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="max-w-[600px] mx-auto px-4 py-20 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-300 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                    </svg>
                    <h1 className="font-display text-3xl text-[#1a1a1a] mb-3">No Orders Yet</h1>
                    <p className="text-gray-400 text-sm mb-6">You haven&apos;t placed any orders yet.</p>
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
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
            <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-3xl sm:text-4xl text-[#1a1a1a] mb-10"
            >
                My <em className="italic">Orders</em>
            </motion.h1>

            <div className="space-y-4">
                {orders.map((order, i) => (
                    <motion.div
                        key={order._id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <Link
                            to={`/track/${order._id}`}
                            className="block bg-[#faf8f5] rounded-2xl border border-[#e8e3dc] p-5 sm:p-6 hover:border-[#d4912a]/40 hover:shadow-md transition-all duration-300 group"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <p className="font-black text-[#1a1a1a] text-sm">
                                        #{order._id.slice(-6).toUpperCase()}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </p>
                                </div>
                                <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>
                                    {statusLabels[order.status] || order.status}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 mb-3">
                                {order.items.slice(0, 3).map((item, j) => (
                                    item.image && <img key={j} src={item.image} alt={item.name} className="w-8 h-8 rounded-lg object-cover" />
                                ))}
                                {order.items.length > 3 && (
                                    <span className="text-xs text-gray-400 font-medium">+{order.items.length - 3} more</span>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-500">
                                    {order.items.length} item{order.items.length > 1 ? 's' : ''}
                                </p>
                                <div className="flex items-center gap-2">
                                    <p className="font-black text-[#1a1a1a]">₹{order.totalAmount.toFixed(2)}</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-300 group-hover:text-[#d4912a] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistory;
