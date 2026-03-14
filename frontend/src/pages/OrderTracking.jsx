import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getOrderTracking } from '../services/api';

// SVG Icons for each step
const PackageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
    </svg>
);

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

const ChefIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
    </svg>
);

const TruckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
);

const GiftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
    </svg>
);

const steps = [
    { key: 'placed', label: 'Order Placed', Icon: PackageIcon, description: 'Your order has been received' },
    { key: 'confirmed', label: 'Confirmed', Icon: CheckCircleIcon, description: 'Restaurant confirmed your order' },
    { key: 'preparing', label: 'Preparing', Icon: ChefIcon, description: 'Your meal is being prepared' },
    { key: 'out_for_delivery', label: 'On the Way', Icon: TruckIcon, description: 'Your order is out for delivery' },
    { key: 'delivered', label: 'Delivered', Icon: GiftIcon, description: 'Order delivered successfully' },
];

const OrderTracking = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const data = await getOrderTracking(orderId);
                setOrder(data);
            } catch (err) {
                setError('Order not found. Please check your order ID.');
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
        const interval = setInterval(fetchOrder, 30000);
        return () => clearInterval(interval);
    }, [orderId]);

    if (loading) {
        return (
            <div className="max-w-[600px] mx-auto px-4 py-20 text-center">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-[#1a1a1a] rounded-full animate-spin mx-auto" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-[600px] mx-auto px-4 py-20 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-300 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <h1 className="font-display text-2xl text-[#1a1a1a] mb-3">Order Not Found</h1>
                <p className="text-gray-400 text-sm mb-6">{error}</p>
                <Link to="/" className="text-sm text-[#d4912a] font-semibold hover:underline">&larr; Back to Home</Link>
            </div>
        );
    }

    const currentStepIndex = steps.findIndex(s => s.key === order.status);
    const isCancelled = order.status === 'cancelled';

    return (
        <div className="max-w-[700px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                {/* Header */}
                <div className="text-center mb-10">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4912a] mb-2">Order Tracking</p>
                    <h1 className="font-display text-3xl text-[#1a1a1a]">
                        #{order._id.slice(-6).toUpperCase()}
                    </h1>
                    <p className="text-gray-400 text-sm mt-2">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                </div>

                {/* Cancelled Banner */}
                {isCancelled && (
                    <div className="mb-8 bg-red-50 border border-red-200 rounded-2xl p-5 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-400 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <p className="font-bold text-red-600">This order has been cancelled</p>
                    </div>
                )}

                {/* Progress Steps */}
                {!isCancelled && (
                    <div className="bg-[#faf8f5] rounded-3xl border border-[#e8e3dc] p-6 sm:p-8 mb-8">
                        <div className="space-y-0">
                            {steps.map((step, i) => {
                                const isActive = i <= currentStepIndex;
                                const isCurrent = i === currentStepIndex;
                                const historyEntry = order.statusHistory?.find(h => h.status === step.key);
                                const StepIcon = step.Icon;

                                return (
                                    <div key={step.key} className="flex gap-4">
                                        {/* Timeline */}
                                        <div className="flex flex-col items-center">
                                            <motion.div
                                                initial={{ scale: 0.8 }}
                                                animate={{ scale: isCurrent ? 1.15 : 1 }}
                                                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all duration-300 ${isActive
                                                        ? 'bg-[#1a1a1a] border-[#1a1a1a] text-white'
                                                        : 'bg-white border-gray-200 text-gray-300'
                                                    } ${isCurrent ? 'ring-4 ring-[#1a1a1a]/10' : ''}`}
                                            >
                                                <StepIcon />
                                            </motion.div>
                                            {i < steps.length - 1 && (
                                                <div className={`w-0.5 h-12 transition-colors duration-300 ${i < currentStepIndex ? 'bg-[#1a1a1a]' : 'bg-gray-200'
                                                    }`} />
                                            )}
                                        </div>

                                        {/* Label */}
                                        <div className={`pt-2 pb-6 ${isActive ? '' : 'opacity-40'}`}>
                                            <p className={`font-bold text-sm ${isCurrent ? 'text-[#1a1a1a]' : 'text-gray-600'}`}>
                                                {step.label}
                                                {isCurrent && (
                                                    <span className="ml-2 inline-block w-1.5 h-1.5 bg-[#d4912a] rounded-full align-middle" />
                                                )}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-0.5">{step.description}</p>
                                            {historyEntry && (
                                                <p className="text-[11px] text-gray-300 mt-1">
                                                    {new Date(historyEntry.timestamp).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Order Details */}
                <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8">
                    <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 mb-4">Order Details</h2>
                    <div className="space-y-3 mb-6">
                        {order.items.map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                {item.image && <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />}
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-[#1a1a1a]">{item.name}</p>
                                    <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                                </div>
                                <p className="text-sm font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-gray-100 pt-4 flex justify-between font-black text-[#1a1a1a]">
                        <span>Total</span>
                        <span>₹{order.totalAmount.toFixed(2)}</span>
                    </div>

                    {/* Delivery Info */}
                    <div className="mt-6 border-t border-gray-100 pt-4">
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 mb-2">Delivery To</p>
                        <p className="text-sm text-[#1a1a1a] font-medium">{order.customerName}</p>
                        <p className="text-sm text-gray-500">{order.address}</p>
                        {order.deliveryDate && (
                            <p className="text-sm text-[#d4912a] font-medium mt-1">
                                {new Date(order.deliveryDate).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
                            </p>
                        )}
                    </div>
                </div>

                <div className="text-center mt-8">
                    <Link to="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
                        &larr; Back to Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default OrderTracking;
