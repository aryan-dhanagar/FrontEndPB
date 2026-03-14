import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder, getSettings, getSlotAvailability } from '../services/api';

/* ── SVG Icons ─────────────────────────────────────────────────── */
const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);
const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
);
const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
    </svg>
);

const CheckoutPage = () => {
    const { cartItems, cartTotal, cartCount, clearCart } = useCart();
    const { user, isLoggedIn, openLogin } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        customerName: '',
        email: '',
        phone: '',
        address: '',
        deliveryArea: '',
        deliverySlot: '',
        deliveryDate: '',
    });

    // Dynamic delivery fee based on area
    const getDeliveryFee = () => {
        if (!form.deliveryArea) return 0;
        if (form.deliveryArea === 'Malad East') return 0;
        if (form.deliveryArea === 'Goregaon East') return cartTotal >= 1000 ? 0 : 20;
        return 0;
    };
    const deliveryFee = getDeliveryFee();
    const finalTotal = cartTotal + deliveryFee;
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(null);

    // Settings & availability
    const [settings, setSettings] = useState(null);
    const [slotData, setSlotData] = useState(null);
    const [outsideHours, setOutsideHours] = useState(false);
    const [loadingSettings, setLoadingSettings] = useState(true);

    // Get tomorrow's date string
    const getTomorrowDate = () => {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        return d.toISOString().split('T')[0];
    };

    // Check if current IST time is within ordering hours
    const checkOrderingHours = (s) => {
        const now = new Date();
        const istOffset = 5.5 * 60 * 60 * 1000;
        const istHour = new Date(now.getTime() + istOffset).getUTCHours();
        return istHour >= (s.orderingHoursStart || 9) && istHour < (s.orderingHoursEnd || 21);
    };

    // Load settings and slot availability
    useEffect(() => {
        const load = async () => {
            try {
                const s = await getSettings();
                setSettings(s);

                const tomorrow = getTomorrowDate();
                setForm(prev => ({ ...prev, deliveryDate: tomorrow }));

                const availability = await getSlotAvailability(tomorrow);
                setSlotData(availability);
            } catch {
                // Use defaults
                setSettings({
                    serviceableAreas: ['Malad East', 'Goregaon East'],
                    deliverySlots: [
                        { key: 'morning', label: 'Morning' },
                        { key: 'lunch', label: 'Lunch' },
                    ],
                    orderingHoursStart: 9,
                    orderingHoursEnd: 21,
                    maxDeliveriesPerSlot: 50,
                    maxItemsPerCustomerPerDay: 15,
                });
            } finally {
                setLoadingSettings(false);
            }
        };
        load();
    }, []);

    // Pre-fill from user profile
    useEffect(() => {
        if (user) {
            setForm(prev => ({
                ...prev,
                customerName: user.name || prev.customerName,
                email: user.email || prev.email,
                phone: user.phone || prev.phone,
                address: user.address || prev.address,
            }));
        }
    }, [user]);

    // Redirect if cart is empty (unless order just succeeded)
    useEffect(() => {
        if (cartCount === 0 && !orderSuccess) {
            navigate('/cart');
        }
    }, [cartCount, orderSuccess, navigate]);

    const validate = () => {
        const e = {};
        if (!form.customerName.trim()) e.customerName = 'Name is required';
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
        if (!form.deliveryArea) e.deliveryArea = 'Please select a delivery area';
        if (!form.address.trim()) e.address = 'Full address is required';
        if (!form.deliverySlot) e.deliverySlot = 'Please select a delivery slot';
        if (!form.deliveryDate) e.deliveryDate = 'Delivery date is required';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Must be verified to place order
        if (!isLoggedIn) {
            openLogin('checkout', () => { });
            return;
        }

        if (!validate()) return;

        setSubmitting(true);
        try {
            const orderData = {
                customerName: form.customerName,
                email: form.email,
                phone: form.phone,
                address: form.address,
                deliveryArea: form.deliveryArea,
                deliverySlot: form.deliverySlot,
                deliveryDate: form.deliveryDate,
                items: cartItems.map(item => ({
                    product: item._id || item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image,
                })),
                totalAmount: finalTotal,
                paymentStatus: 'paid',
            };

            const order = await createOrder(orderData);
            setOrderSuccess(order);
            clearCart();
        } catch (err) {
            const msg = err.response?.data?.message || 'Order failed. Try again.';
            const code = err.response?.data?.code;
            if (code === 'OUTSIDE_HOURS') {
                setOutsideHours(true);
            }
            setErrors({ submit: msg });
        } finally {
            setSubmitting(false);
        }
    };

    // Loading state
    if (loadingSettings) {
        return (
            <div className="max-w-[600px] mx-auto px-4 py-20 text-center">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-[#1a1a1a] rounded-full animate-spin mx-auto" />
                <p className="text-gray-400 text-sm mt-4">Loading checkout...</p>
            </div>
        );
    }

    // Success Screen
    if (orderSuccess) {
        const orderId = orderSuccess._id;
        const slotLabel = settings?.deliverySlots?.find(s => s.key === orderSuccess.deliverySlot)?.label || orderSuccess.deliverySlot;
        return (
            <div className="max-w-[600px] mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-green-500 mx-auto mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <h1 className="font-display text-3xl text-[#1a1a1a] mb-3">Order Placed!</h1>
                    <p className="text-gray-500 mb-1">Your order has been confirmed.</p>
                    <div className="bg-[#faf8f5] rounded-2xl border border-[#e8e3dc] p-4 mb-6 mt-4 space-y-1">
                        <p className="text-sm text-gray-500">Order ID: <strong className="text-[#1a1a1a]">#{orderId.slice(-6).toUpperCase()}</strong></p>
                        <p className="text-sm text-gray-500">Delivery: <strong className="text-[#1a1a1a]">{slotLabel}</strong> on <strong className="text-[#1a1a1a]">{new Date(form.deliveryDate).toLocaleDateString('en-IN', { dateStyle: 'long' })}</strong></p>
                        <p className="text-sm text-gray-500">Area: <strong className="text-[#1a1a1a]">{orderSuccess.deliveryArea}</strong></p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            to={`/track/${orderId}`}
                            className="inline-block bg-[#1a1a1a] text-white font-bold text-sm uppercase tracking-wider px-8 py-3 rounded-2xl hover:bg-[#333] transition-colors"
                        >
                            Track Order
                        </Link>
                        <Link
                            to="/"
                            className="inline-block border-2 border-[#1a1a1a] text-[#1a1a1a] font-bold text-sm uppercase tracking-wider px-8 py-3 rounded-2xl hover:bg-gray-50 transition-colors"
                        >
                            Back to Home
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    const areas = settings?.serviceableAreas || [];
    const slots = slotData?.slots || settings?.deliverySlots || [];

    return (
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
            <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-3xl sm:text-4xl text-[#1a1a1a] mb-10"
            >
                <em className="italic">Checkout</em>
            </motion.h1>

            {/* Outside ordering hours banner */}
            {outsideHours && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center"
                >
                    <div className="flex items-center justify-center gap-2 text-amber-600 mb-2">
                        <ClockIcon />
                        <h2 className="font-bold text-lg">We're closed for orders right now</h2>
                    </div>
                    <p className="text-sm text-gray-600">
                        Orders can be placed between <strong>{settings?.orderingHoursStart || 9} AM</strong> and <strong>{(settings?.orderingHoursEnd || 21) > 12 ? (settings?.orderingHoursEnd || 21) - 12 : settings?.orderingHoursEnd || 21} PM</strong> IST.
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Come back during ordering hours to place your order for tomorrow!</p>
                </motion.div>
            )}

            {/* Verification Banner */}
            {!isLoggedIn && !outsideHours && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-center justify-between"
                >
                    <div>
                        <p className="font-semibold text-[#1a1a1a] text-sm">Verify your email to place an order</p>
                        <p className="text-xs text-gray-500 mt-1">Quick verification — takes just 30 seconds.</p>
                    </div>
                    <button
                        onClick={() => openLogin('checkout')}
                        className="bg-[#1a1a1a] text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl hover:bg-[#333] transition-colors flex-shrink-0"
                    >
                        Verify Email
                    </button>
                </motion.div>
            )}

            <div className="flex flex-col lg:flex-row gap-10">
                {/* Form */}
                <form onSubmit={handleSubmit} className={`flex-1 space-y-5 ${outsideHours ? 'opacity-50 pointer-events-none' : ''}`}>
                    {/* Verified badge */}
                    {isLoggedIn && (
                        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-4 py-2.5 rounded-xl w-fit">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">Email verified: {user?.email}</span>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
                        <input
                            type="text"
                            value={form.customerName}
                            onChange={e => setForm({ ...form, customerName: e.target.value })}
                            className={`w-full px-4 py-3.5 border rounded-2xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent transition-all ${errors.customerName ? 'border-red-300' : 'border-gray-200'}`}
                            placeholder="John Doe"
                        />
                        {errors.customerName && <p className="text-xs text-red-500 mt-1">{errors.customerName}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            className={`w-full px-4 py-3.5 border rounded-2xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent transition-all ${errors.email ? 'border-red-300' : 'border-gray-200'}`}
                            placeholder="you@example.com"
                            disabled={isLoggedIn}
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone</label>
                        <input
                            type="tel"
                            value={form.phone}
                            onChange={e => setForm({ ...form, phone: e.target.value })}
                            className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent transition-all"
                            placeholder="+91 98765 43210"
                        />
                    </div>

                    {/* ═══ DELIVERY AREA DROPDOWN ═══ */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                            <MapPinIcon /> Delivery Area *
                        </label>
                        <select
                            value={form.deliveryArea}
                            onChange={e => setForm({ ...form, deliveryArea: e.target.value })}
                            className={`w-full px-4 py-3.5 border rounded-2xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent transition-all bg-white ${errors.deliveryArea ? 'border-red-300' : 'border-gray-200'}`}
                        >
                            <option value="">Select your delivery area</option>
                            {areas.map(area => (
                                <option key={area} value={area}>{area}</option>
                            ))}
                        </select>
                        {form.deliveryArea && (
                            <p className="text-xs text-green-600 font-medium mt-1 flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                                </svg>
                                We deliver here ✓
                            </p>
                        )}
                        {/* Delivery charge info based on area */}
                        {form.deliveryArea && (
                            <div className="mt-2 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
                                <p className="text-xs font-semibold text-[#1a1a1a]">
                                    {form.deliveryArea === 'Malad East'
                                        ? '🚚 Free delivery for all orders in Malad East!'
                                        : cartTotal >= 1000
                                            ? '🚚 Free delivery! (Order above ₹1,000)'
                                            : `🚚 Delivery charge: ₹20 (Free on orders above ₹1,000)`
                                    }
                                </p>
                            </div>
                        )}
                        {errors.deliveryArea && <p className="text-xs text-red-500 mt-1">{errors.deliveryArea}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Address (flat, building, landmark) *</label>
                        <textarea
                            value={form.address}
                            onChange={e => setForm({ ...form, address: e.target.value })}
                            rows={3}
                            className={`w-full px-4 py-3.5 border rounded-2xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent transition-all resize-none ${errors.address ? 'border-red-300' : 'border-gray-200'}`}
                            placeholder="Flat 4B, Sunshine Towers, Near Station"
                        />
                        {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                    </div>

                    {/* ═══ DELIVERY SLOT SELECTOR ═══ */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                            <SunIcon /> Delivery Slot for Tomorrow *
                        </label>
                        <p className="text-xs text-gray-400 mb-3">
                            {new Date(getTomorrowDate()).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                        {slots.length === 0 ? (
                            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 text-center">
                                <p className="font-bold text-red-600 text-sm">No delivery available tomorrow</p>
                                <p className="text-xs text-red-400 mt-1">All delivery slots are currently unavailable. Please check tomorrow.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {slots.map(slot => {
                                    const slotInfo = slot;
                                    const isFull = slotInfo.isFull || false;
                                    const available = slotInfo.available !== undefined ? slotInfo.available : settings?.maxDeliveriesPerSlot || 50;
                                    const max = slotInfo.max || settings?.maxDeliveriesPerSlot || 50;
                                    const isSelected = form.deliverySlot === (slotInfo.key || slot.key);

                                    return (
                                        <button
                                            key={slotInfo.key || slot.key}
                                            type="button"
                                            disabled={isFull}
                                            onClick={() => setForm({ ...form, deliverySlot: slotInfo.key || slot.key })}
                                            className={`relative p-4 rounded-2xl border-2 text-left transition-all ${isFull
                                                ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                                                : isSelected
                                                    ? 'border-[#d4912a] bg-amber-50 ring-2 ring-[#d4912a]/20'
                                                    : 'border-gray-200 hover:border-gray-300 cursor-pointer'
                                                }`}
                                        >
                                            <p className="font-bold text-sm text-[#1a1a1a]">
                                                {slotInfo.label || slot.label}
                                            </p>
                                            {(slotInfo.startTime || slot.startTime) && (slotInfo.endTime || slot.endTime) && (
                                                <p className="text-xs text-gray-500 mt-0.5">{slotInfo.startTime || slot.startTime} – {slotInfo.endTime || slot.endTime}</p>
                                            )}
                                            <p className="text-xs text-gray-400 mt-1">
                                                {isFull ? (
                                                    <span className="text-red-500 font-semibold">Fully booked</span>
                                                ) : (
                                                    <>{available}/{max} slots available</>
                                                )}
                                            </p>
                                            {isSelected && (
                                                <div className="absolute top-3 right-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#d4912a]" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                        {errors.deliverySlot && <p className="text-xs text-red-500 mt-1">{errors.deliverySlot}</p>}
                    </div>

                    {/* Item limit notice */}
                    <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-2.5 text-xs text-blue-600 font-medium">
                        Max {settings?.maxItemsPerCustomerPerDay || 15} items per day per customer. You have {cartItems.reduce((s, i) => s + i.quantity, 0)} items in cart.
                    </div>

                    {errors.submit && (
                        <div className="px-4 py-3 bg-red-50 text-red-600 text-sm rounded-xl font-medium">{errors.submit}</div>
                    )}

                    <button
                        type="submit"
                        disabled={submitting || outsideHours}
                        className="w-full bg-[#1a1a1a] text-white font-bold text-sm uppercase tracking-wider py-4 rounded-2xl hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? 'Placing Order...' : isLoggedIn ? `Place Order — ₹${finalTotal.toFixed(2)}` : 'Verify Email & Place Order'}
                    </button>
                </form>

                {/* Order Summary Sidebar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:w-[380px] flex-shrink-0"
                >
                    <div className="bg-[#faf8f5] rounded-3xl p-6 sm:p-8 border border-[#e8e3dc] sticky top-28">
                        <h2 className="font-bold text-lg text-[#1a1a1a] mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-6">
                            {cartItems.map(item => (
                                <div key={item._id || item.id} className="flex items-center gap-3">
                                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-[#1a1a1a] truncate">{item.name}</p>
                                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="text-sm font-bold text-[#1a1a1a]">₹{(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2 text-sm border-t border-[#e8e3dc] pt-4">
                            <div className="flex justify-between text-gray-500">
                                <span>Subtotal</span>
                                <span>₹{cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Delivery</span>
                                <span className={deliveryFee === 0 ? 'text-green-600 font-medium' : ''}>
                                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(2)}`}
                                </span>
                            </div>
                            <div className="flex justify-between font-black text-[#1a1a1a] text-base pt-2 border-t border-[#e8e3dc]">
                                <span>Total</span>
                                <span>₹{finalTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Selected delivery info */}
                        {(form.deliveryArea || form.deliverySlot) && (
                            <div className="mt-4 pt-4 border-t border-[#e8e3dc] space-y-1.5">
                                {form.deliveryArea && (
                                    <p className="text-xs text-gray-500 flex items-center gap-1.5">
                                        <MapPinIcon /> <span className="font-semibold text-[#1a1a1a]">{form.deliveryArea}</span>
                                    </p>
                                )}
                                {form.deliverySlot && (
                                    <p className="text-xs text-gray-500 flex items-center gap-1.5">
                                        <ClockIcon /> <span className="font-semibold text-[#1a1a1a]">
                                            {slots.find(s => (s.key) === form.deliverySlot)?.label || form.deliverySlot}
                                        </span>
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CheckoutPage;
