import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    getProducts,
    adminLogin,
    adminVerify,
    adminCreateProduct,
    adminUpdateProduct,
    adminDeleteProduct,
    adminGetOrders,
    adminUpdateOrderStatus,
    adminUpdateProductStock,
    adminGetOrdersBySlot,
    getSettings,
    adminUpdateSettings,
} from '../services/api';

/* ─── SVG ICONS ────────────────────────────────────────────────── */
const PackageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
);
const OrderIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
    </svg>
);
const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);
const PencilIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
);
const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
);
const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);
const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
);
const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);
const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
);
const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
    </svg>
);

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
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
};
const statusFlow = ['placed', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'];

const emptyProduct = {
    name: '', description: '', longDescription: '', price: '',
    image: '', images: '', video: '', category: 'Salad', ingredients: '',
    calories: '', proteinPer100g: '', fiberPer100g: '', isVegan: true,
};

/* ═══════════════════════════════════════════════════════════════════ */
/*  ADMIN LOGIN SCREEN (no registration — whitelisted emails only)    */
/* ═══════════════════════════════════════════════════════════════════ */

const AdminLogin = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!email.trim() || !password.trim()) {
            setError('Email and password are required');
            return;
        }

        setLoading(true);
        try {
            const result = await adminLogin(email.trim(), password);
            localStorage.setItem('adminToken', result.token);
            onLogin(result);
        } catch (err) {
            setError(err.response?.data?.message || 'Access denied');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[420px]"
            >
                <div className="text-center mb-8">
                    <div className="w-14 h-14 bg-[#1a1a1a] rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                        <LockIcon />
                    </div>
                    <h1 className="font-display text-3xl text-[#1a1a1a]">Admin Access</h1>
                    <p className="text-gray-400 text-sm mt-2">Authorized personnel only.</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-[#faf8f5] rounded-3xl border border-[#e8e3dc] p-6 sm:p-8 space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent"
                            placeholder="admin@email.com"
                            autoComplete="email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent pr-11"
                                placeholder="Enter password"
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-2.5 rounded-xl font-medium">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#1a1a1a] text-white font-bold text-sm uppercase tracking-wider py-3.5 rounded-2xl hover:bg-[#333] transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Verifying...' : 'Login'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

/* ═══════════════════════════════════════════════════════════════════ */
/*  ADMIN PAGE (auth gate)                                             */
/* ═══════════════════════════════════════════════════════════════════ */

const AdminPage = () => {
    const [admin, setAdmin] = useState(null);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('adminToken');
            if (!token) { setChecking(false); return; }
            try {
                const { admin: a } = await adminVerify();
                setAdmin(a);
            } catch {
                localStorage.removeItem('adminToken');
            } finally {
                setChecking(false);
            }
        };
        checkToken();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setAdmin(null);
    };

    if (checking) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-[#1a1a1a] rounded-full animate-spin" />
            </div>
        );
    }

    if (!admin) return <AdminLogin onLogin={(data) => setAdmin(data)} />;
    return <AdminDashboard admin={admin} onLogout={handleLogout} />;
};

/* ═══════════════════════════════════════════════════════════════════ */
/*  DASHBOARD CONTENT                                                  */
/* ═══════════════════════════════════════════════════════════════════ */

const AdminDashboard = ({ admin, onLogout }) => {
    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [form, setForm] = useState(emptyProduct);
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');
    const [deleting, setDeleting] = useState(null);
    const [orderFilter, setOrderFilter] = useState('all');

    // Deliveries tab
    const [slotOrders, setSlotOrders] = useState([]);
    const [slotDate, setSlotDate] = useState(() => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split('T')[0]; });
    const [slotFilter, setSlotFilter] = useState('all');
    const [slotLoading, setSlotLoading] = useState(false);

    // Settings tab
    const [siteSettings, setSiteSettings] = useState(null);
    const [settingsForm, setSettingsForm] = useState(null);
    const [settingsSaving, setSettingsSaving] = useState(false);
    const [settingsMsg, setSettingsMsg] = useState('');

    // Stock editing
    const [editingStock, setEditingStock] = useState(null);
    const [stockValue, setStockValue] = useState('');

    const fetchProducts = async () => { try { const data = await getProducts(); setProducts(data || []); } catch { setProducts([]); } };
    const fetchOrders = async () => { try { const data = await adminGetOrders(); setOrders(data || []); } catch { setOrders([]); } };
    const fetchSlotOrders = async (date, slot) => {
        setSlotLoading(true);
        try {
            const data = await adminGetOrdersBySlot(date || slotDate, slot === 'all' ? '' : slot);
            setSlotOrders(data.orders || []);
        } catch { setSlotOrders([]); }
        finally { setSlotLoading(false); }
    };
    const fetchSettings = async () => {
        try { const data = await getSettings(); setSiteSettings(data); setSettingsForm(data); } catch {}
    };

    useEffect(() => {
        const load = async () => { setLoading(true); await Promise.all([fetchProducts(), fetchOrders(), fetchSettings()]); setLoading(false); };
        load();
    }, []);

    const openAddForm = () => { setEditingProduct(null); setForm(emptyProduct); setFormError(''); setFormSuccess(''); setShowForm(true); };
    const openEditForm = (product) => {
        setEditingProduct(product);
        setForm({
            name: product.name || '', description: product.description || '',
            longDescription: product.longDescription || '', price: product.price || '',
            image: product.image || '', images: (product.images || []).join(', '),
            video: product.video || '', category: product.category || 'Salad',
            ingredients: (product.ingredients || []).join(', '), calories: product.calories || '', proteinPer100g: product.proteinPer100g || '', fiberPer100g: product.fiberPer100g || '',
            isVegan: product.isVegan !== false,
        });
        setFormError(''); setFormSuccess(''); setShowForm(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault(); setFormError(''); setFormSuccess('');
        if (!form.name.trim() || !form.price || !form.image.trim()) { setFormError('Name, Price, and Image URL are required.'); return; }
        const payload = {
            ...form, price: parseFloat(form.price), proteinPer100g: form.proteinPer100g ? parseFloat(form.proteinPer100g) : 0, fiberPer100g: form.fiberPer100g ? parseFloat(form.fiberPer100g) : 0,
            ingredients: form.ingredients ? form.ingredients.split(',').map(s => s.trim()).filter(Boolean) : [],
            images: form.images ? form.images.split(',').map(s => s.trim()).filter(Boolean) : [],
            video: form.video ? form.video.trim() : '',
        };
        try {
            if (editingProduct) { await adminUpdateProduct(editingProduct._id, payload); setFormSuccess('Product updated!'); }
            else { await adminCreateProduct(payload); setFormSuccess('Product created!'); }
            await fetchProducts();
            setTimeout(() => { setShowForm(false); setFormSuccess(''); }, 1200);
        } catch (err) { setFormError(err.response?.data?.message || 'Failed to save.'); }
    };

    const handleDelete = async (id) => {
        if (deleting === id) {
            try { await adminDeleteProduct(id); await fetchProducts(); setDeleting(null); }
            catch (err) { alert(err.response?.data?.message || 'Failed to delete.'); setDeleting(null); }
        } else { setDeleting(id); setTimeout(() => setDeleting(null), 3000); }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try { await adminUpdateOrderStatus(orderId, newStatus); await fetchOrders(); }
        catch (err) { alert(err.response?.data?.message || 'Failed to update.'); }
    };

    const handleStockSave = async (productId) => {
        try {
            await adminUpdateProductStock(productId, parseInt(stockValue));
            await fetchProducts();
            setEditingStock(null);
        } catch (err) { alert(err.response?.data?.message || 'Failed to update stock.'); }
    };

    const handleSettingsSave = async () => {
        setSettingsSaving(true); setSettingsMsg('');
        try {
            const updated = await adminUpdateSettings(settingsForm);
            setSiteSettings(updated); setSettingsMsg('Settings saved!');
            setTimeout(() => setSettingsMsg(''), 2000);
        } catch (err) { setSettingsMsg('Failed to save: ' + (err.response?.data?.message || err.message)); }
        finally { setSettingsSaving(false); }
    };

    const filteredOrders = orderFilter === 'all' ? orders : orders.filter(o => o.status === orderFilter);

    if (loading) {
        return (
            <div className="max-w-[1200px] mx-auto px-4 py-20 text-center">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-[#1a1a1a] rounded-full animate-spin mx-auto" />
                <p className="text-gray-400 text-sm mt-4">Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4912a] mb-1">Admin Panel</p>
                    <h1 className="font-display text-3xl sm:text-4xl text-[#1a1a1a]">Dashboard</h1>
                    <p className="text-sm text-gray-400 mt-1">Logged in as <strong className="text-[#1a1a1a]">{admin.email || admin.name}</strong></p>
                </div>
                <button onClick={onLogout} className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 px-4 py-2 rounded-xl transition-all font-medium">
                    <LogoutIcon /> Logout
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="bg-[#faf8f5] rounded-2xl border border-[#e8e3dc] p-4 text-center">
                    <p className="text-2xl font-black text-[#1a1a1a]">{products.length}</p>
                    <p className="text-xs text-gray-400 font-medium mt-1">Products</p>
                </div>
                <div className="bg-[#faf8f5] rounded-2xl border border-[#e8e3dc] p-4 text-center">
                    <p className="text-2xl font-black text-[#1a1a1a]">{orders.length}</p>
                    <p className="text-xs text-gray-400 font-medium mt-1">Total Orders</p>
                </div>
                <div className="bg-[#faf8f5] rounded-2xl border border-[#e8e3dc] p-4 text-center">
                    <p className="text-2xl font-black text-green-600">{orders.filter(o => o.status === 'delivered').length}</p>
                    <p className="text-xs text-gray-400 font-medium mt-1">Delivered</p>
                </div>
                <div className="bg-[#faf8f5] rounded-2xl border border-[#e8e3dc] p-4 text-center">
                    <p className="text-2xl font-black text-amber-600">{orders.filter(o => !['delivered', 'cancelled'].includes(o.status)).length}</p>
                    <p className="text-xs text-gray-400 font-medium mt-1">Active</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-8 w-fit flex-wrap">
                <button onClick={() => setActiveTab('products')} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'products' ? 'bg-[#1a1a1a] text-white shadow-lg' : 'text-gray-500 hover:text-gray-700'}`}>
                    <PackageIcon /> Products
                </button>
                <button onClick={() => setActiveTab('orders')} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'orders' ? 'bg-[#1a1a1a] text-white shadow-lg' : 'text-gray-500 hover:text-gray-700'}`}>
                    <OrderIcon /> Orders
                    {orders.filter(o => !['delivered', 'cancelled'].includes(o.status)).length > 0 && (
                        <span className="w-5 h-5 rounded-full bg-[#d4912a] text-white text-[10px] font-bold flex items-center justify-center">
                            {orders.filter(o => !['delivered', 'cancelled'].includes(o.status)).length}
                        </span>
                    )}
                </button>
                <button onClick={() => { setActiveTab('deliveries'); fetchSlotOrders(slotDate, slotFilter); }} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'deliveries' ? 'bg-[#1a1a1a] text-white shadow-lg' : 'text-gray-500 hover:text-gray-700'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
                    Deliveries
                </button>
                <button onClick={() => { setActiveTab('settings'); fetchSettings(); }} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'settings' ? 'bg-[#1a1a1a] text-white shadow-lg' : 'text-gray-500 hover:text-gray-700'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                    Settings
                </button>
            </div>

            {/* ═══ PRODUCTS TAB ═══ */}
            {activeTab === 'products' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="flex justify-between items-center mb-6">
                        <p className="text-sm text-gray-500">{products.length} product{products.length !== 1 ? 's' : ''}</p>
                        <button onClick={openAddForm} className="flex items-center gap-2 bg-[#1a1a1a] text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-[#333] transition-colors">
                            <PlusIcon /> Add Product
                        </button>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-100 text-left">
                                        <th className="py-3 px-4 font-bold text-gray-400 text-xs uppercase tracking-wider">Product</th>
                                        <th className="py-3 px-4 font-bold text-gray-400 text-xs uppercase tracking-wider">Price</th>
                                        <th className="py-3 px-4 font-bold text-gray-400 text-xs uppercase tracking-wider hidden sm:table-cell">Stock/Day</th>
                                        <th className="py-3 px-4 font-bold text-gray-400 text-xs uppercase tracking-wider hidden sm:table-cell">Category</th>
                                        <th className="py-3 px-4 font-bold text-gray-400 text-xs uppercase tracking-wider hidden md:table-cell">Vegan</th>
                                        <th className="py-3 px-4 font-bold text-gray-400 text-xs uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(p => (
                                        <tr key={p._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    {p.image && <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />}
                                                    <div>
                                                        <p className="font-semibold text-[#1a1a1a]">{p.name}</p>
                                                        <p className="text-xs text-gray-400 truncate max-w-[200px]">{p.slug}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 font-bold text-[#1a1a1a]">₹{p.price}</td>
                                            <td className="py-3 px-4 hidden sm:table-cell">
                                                {editingStock === p._id ? (
                                                    <div className="flex items-center gap-1">
                                                        <input type="number" value={stockValue} onChange={e => setStockValue(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleStockSave(p._id)} className="w-16 px-2 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1a1a1a]" autoFocus />
                                                        <button onClick={() => handleStockSave(p._id)} className="text-green-600 hover:text-green-700 text-xs font-bold">✓</button>
                                                        <button onClick={() => setEditingStock(null)} className="text-gray-400 hover:text-gray-600 text-xs">✕</button>
                                                    </div>
                                                ) : (
                                                    <button onClick={() => { setEditingStock(p._id); setStockValue(p.dailyStock || 50); }} className="text-sm font-semibold text-[#1a1a1a] bg-gray-50 px-2.5 py-1 rounded-lg hover:bg-gray-100 transition-colors" title="Click to edit">
                                                        {p.dailyStock || 50}
                                                    </button>
                                                )}
                                            </td>
                                            <td className="py-3 px-4 text-gray-500 hidden sm:table-cell">{p.category || '—'}</td>
                                            <td className="py-3 px-4 hidden md:table-cell">
                                                {p.isVegan ? <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Yes</span> : <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">No</span>}
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2 justify-end">
                                                    <button onClick={() => openEditForm(p)} className="p-2 rounded-lg text-gray-400 hover:text-[#1a1a1a] hover:bg-gray-100 transition-all" title="Edit"><PencilIcon /></button>
                                                    <button onClick={() => handleDelete(p._id)} className={`p-2 rounded-lg transition-all ${deleting === p._id ? 'text-white bg-red-500 hover:bg-red-600' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`} title={deleting === p._id ? 'Click again to confirm' : 'Delete'}><TrashIcon /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {products.length === 0 && <tr><td colSpan={6} className="text-center py-12 text-gray-400">No products yet.</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* ═══ ORDERS TAB ═══ */}
            {activeTab === 'orders' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {['all', ...statusFlow, 'cancelled'].map(s => (
                            <button key={s} onClick={() => setOrderFilter(s)} className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl transition-all ${orderFilter === s ? 'bg-[#1a1a1a] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                                {s === 'all' ? `All (${orders.length})` : `${statusLabels[s]} (${orders.filter(o => o.status === s).length})`}
                            </button>
                        ))}
                    </div>
                    <div className="space-y-4">
                        {filteredOrders.map(order => {
                            const currentIdx = statusFlow.indexOf(order.status);
                            const nextStatus = currentIdx >= 0 && currentIdx < statusFlow.length - 1 ? statusFlow[currentIdx + 1] : null;
                            return (
                                <motion.div key={order._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <p className="font-black text-[#1a1a1a]">#{order._id.slice(-6).toUpperCase()}</p>
                                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>{statusLabels[order.status] || order.status}</span>
                                            </div>
                                            <p className="text-xs text-gray-400 mt-1">{new Date(order.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                                        </div>
                                        <p className="font-black text-lg text-[#1a1a1a]">₹{order.totalAmount?.toFixed(2)}</p>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 bg-[#faf8f5] rounded-xl p-4 text-sm">
                                        <div><p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Customer</p><p className="font-semibold text-[#1a1a1a] mt-0.5">{order.customerName || '—'}</p></div>
                                        <div><p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Email</p><p className="text-gray-600 mt-0.5">{order.email || '—'}</p></div>
                                        <div><p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Address</p><p className="text-gray-600 mt-0.5 truncate">{order.address || '—'}</p></div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {order.items?.map((item, i) => (
                                            <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5">
                                                {item.image && <img src={item.image} alt={item.name} className="w-6 h-6 rounded object-cover" />}
                                                <span className="text-xs font-medium text-gray-700">{item.name}</span>
                                                <span className="text-xs text-gray-400">×{item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-100">
                                        {nextStatus && order.status !== 'cancelled' && (
                                            <button onClick={() => handleStatusChange(order._id, nextStatus)} className="flex items-center gap-1.5 bg-[#1a1a1a] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl hover:bg-[#333] transition-colors">
                                                Move to: {statusLabels[nextStatus]}
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                                            </button>
                                        )}
                                        {order.status !== 'delivered' && order.status !== 'cancelled' && (
                                            <button onClick={() => handleStatusChange(order._id, 'cancelled')} className="text-xs font-bold text-red-500 hover:text-red-600 px-3 py-2 hover:bg-red-50 rounded-xl transition-all">Cancel Order</button>
                                        )}
                                        {order.status === 'delivered' && (
                                            <p className="text-xs text-green-600 font-bold flex items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                                                Complete
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                        {filteredOrders.length === 0 && <div className="text-center py-16 text-gray-400"><p className="text-sm">No orders found.</p></div>}
                    </div>
                </motion.div>
            )}

            {/* ═══ DELIVERIES TAB ═══ */}
            {activeTab === 'deliveries' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <input type="date" value={slotDate} onChange={e => { setSlotDate(e.target.value); fetchSlotOrders(e.target.value, slotFilter); }} className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]" />
                        {['all', ...(siteSettings?.deliverySlots || []).map(s => s.key)].map(s => (
                            <button key={s} onClick={() => { setSlotFilter(s); fetchSlotOrders(slotDate, s); }} className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl transition-all ${slotFilter === s ? 'bg-[#1a1a1a] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                                {s === 'all' ? 'All Slots' : (siteSettings?.deliverySlots?.find(sl => sl.key === s)?.label || s)}
                            </button>
                        ))}
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
                        <p className="text-sm font-bold text-[#1a1a1a]">{slotOrders.length} order{slotOrders.length !== 1 ? 's' : ''} for {new Date(slotDate + 'T00:00:00').toLocaleDateString('en-IN', { dateStyle: 'long' })}</p>
                        <p className="text-xs text-gray-500 mt-1">{slotFilter === 'all' ? 'All slots' : (siteSettings?.deliverySlots?.find(sl => sl.key === slotFilter)?.label || slotFilter)}</p>
                    </div>
                    {slotLoading ? (
                        <div className="text-center py-16"><div className="w-6 h-6 border-2 border-gray-200 border-t-[#1a1a1a] rounded-full animate-spin mx-auto" /></div>
                    ) : (
                        <div className="space-y-3">
                            {slotOrders.map((order, idx) => (
                                <div key={order._id} className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-black text-white bg-[#1a1a1a] w-7 h-7 rounded-lg flex items-center justify-center">{idx + 1}</span>
                                            <div>
                                                <p className="font-bold text-sm text-[#1a1a1a]">{order.customerName}</p>
                                                <p className="text-xs text-gray-400">{order.phone || order.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>{statusLabels[order.status] || order.status}</span>
                                            <span className="text-xs font-bold text-[#d4912a] bg-amber-50 px-2 py-0.5 rounded-full">{(siteSettings?.deliverySlots?.find(sl => sl.key === order.deliverySlot)?.label) || order.deliverySlot}</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3 text-sm">
                                        <div><p className="text-[10px] font-bold uppercase text-gray-400">Area</p><p className="font-medium text-[#1a1a1a]">{order.deliveryArea || '—'}</p></div>
                                        <div><p className="text-[10px] font-bold uppercase text-gray-400">Address</p><p className="text-gray-600 text-xs">{order.address || '—'}</p></div>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {order.items?.map((item, i) => (
                                            <span key={i} className="text-xs bg-gray-50 rounded-lg px-2 py-1 font-medium">{item.name} ×{item.quantity}</span>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                        <p className="font-black text-[#1a1a1a]">₹{order.totalAmount?.toFixed(2)}</p>
                                        {order.status !== 'delivered' && order.status !== 'cancelled' && (
                                            <button onClick={() => handleStatusChange(order._id, 'delivered').then(() => fetchSlotOrders(slotDate, slotFilter))} className="text-xs font-bold text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg transition-all">
                                                ✓ Mark Delivered
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {slotOrders.length === 0 && <div className="text-center py-16 text-gray-400"><p className="text-sm">No orders for this date/slot.</p></div>}
                        </div>
                    )}
                </motion.div>
            )}

            {/* ═══ SETTINGS TAB ═══ */}
            {activeTab === 'settings' && settingsForm && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[700px]">
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <h3 className="font-bold text-[#1a1a1a] mb-4">Serviceable Areas</h3>
                            <div className="space-y-2">
                                {(settingsForm.serviceableAreas || []).map((area, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <input type="text" value={area} onChange={e => { const a = [...settingsForm.serviceableAreas]; a[i] = e.target.value; setSettingsForm({ ...settingsForm, serviceableAreas: a }); }} className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]" />
                                        <button onClick={() => { const a = settingsForm.serviceableAreas.filter((_, j) => j !== i); setSettingsForm({ ...settingsForm, serviceableAreas: a }); }} className="text-red-400 hover:text-red-600 p-1"><TrashIcon /></button>
                                    </div>
                                ))}
                                <button onClick={() => setSettingsForm({ ...settingsForm, serviceableAreas: [...(settingsForm.serviceableAreas || []), ''] })} className="text-xs font-bold text-[#d4912a] hover:underline mt-1">+ Add Area</button>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <h3 className="font-bold text-[#1a1a1a] mb-4">Delivery Slots</h3>
                            <div className="space-y-3">
                                {(settingsForm.deliverySlots || []).map((slot, i) => (
                                    <div key={i} className="grid grid-cols-2 sm:grid-cols-5 gap-2 items-center bg-gray-50 rounded-xl p-3">
                                        <input type="text" value={slot.key} onChange={e => { const s = [...settingsForm.deliverySlots]; s[i] = { ...s[i], key: e.target.value }; setSettingsForm({ ...settingsForm, deliverySlots: s }); }} className="px-2 py-1.5 border border-gray-200 rounded-lg text-xs" placeholder="key" />
                                        <input type="text" value={slot.label} onChange={e => { const s = [...settingsForm.deliverySlots]; s[i] = { ...s[i], label: e.target.value }; setSettingsForm({ ...settingsForm, deliverySlots: s }); }} className="px-2 py-1.5 border border-gray-200 rounded-lg text-xs sm:col-span-2" placeholder="Label" />
                                        <input type="time" value={slot.startTime} onChange={e => { const s = [...settingsForm.deliverySlots]; s[i] = { ...s[i], startTime: e.target.value }; setSettingsForm({ ...settingsForm, deliverySlots: s }); }} className="px-2 py-1.5 border border-gray-200 rounded-lg text-xs" />
                                        <div className="flex items-center gap-1">
                                            <input type="time" value={slot.endTime} onChange={e => { const s = [...settingsForm.deliverySlots]; s[i] = { ...s[i], endTime: e.target.value }; setSettingsForm({ ...settingsForm, deliverySlots: s }); }} className="flex-1 px-2 py-1.5 border border-gray-200 rounded-lg text-xs" />
                                            <button onClick={() => { const s = settingsForm.deliverySlots.filter((_, j) => j !== i); setSettingsForm({ ...settingsForm, deliverySlots: s }); }} className="text-red-400 hover:text-red-600 p-1"><TrashIcon /></button>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={() => setSettingsForm({ ...settingsForm, deliverySlots: [...(settingsForm.deliverySlots || []), { key: '', label: '', startTime: '08:00', endTime: '11:00' }] })} className="text-xs font-bold text-[#d4912a] hover:underline">+ Add Slot</button>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <h3 className="font-bold text-[#1a1a1a] mb-4">Limits & Hours</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Ordering Hours Start (IST, 24h)</label>
                                    <input type="number" min={0} max={23} value={settingsForm.orderingHoursStart ?? 9} onChange={e => setSettingsForm({ ...settingsForm, orderingHoursStart: parseInt(e.target.value) })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Ordering Hours End (IST, 24h)</label>
                                    <input type="number" min={0} max={23} value={settingsForm.orderingHoursEnd ?? 21} onChange={e => setSettingsForm({ ...settingsForm, orderingHoursEnd: parseInt(e.target.value) })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Max Deliveries per Slot</label>
                                    <input type="number" min={1} value={settingsForm.maxDeliveriesPerSlot ?? 50} onChange={e => setSettingsForm({ ...settingsForm, maxDeliveriesPerSlot: parseInt(e.target.value) })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Max Items per Customer/Day</label>
                                    <input type="number" min={1} value={settingsForm.maxItemsPerCustomerPerDay ?? 15} onChange={e => setSettingsForm({ ...settingsForm, maxItemsPerCustomerPerDay: parseInt(e.target.value) })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Default Daily Stock per Product</label>
                                    <input type="number" min={1} value={settingsForm.defaultDailyStock ?? 50} onChange={e => setSettingsForm({ ...settingsForm, defaultDailyStock: parseInt(e.target.value) })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <h3 className="font-bold text-[#1a1a1a] mb-4">Homepage Hero</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Video URL (mp4)</label>
                                    <input type="url" value={settingsForm.heroVideo || ''} onChange={e => setSettingsForm({ ...settingsForm, heroVideo: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]" placeholder="https://example.com/video.mp4" />
                                    {settingsForm.heroVideo && (
                                        <video src={settingsForm.heroVideo} muted autoPlay loop className="w-32 h-20 object-cover rounded-lg mt-2" />
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-2">Slideshow Images</label>
                                    <div className="space-y-3">
                                        {(settingsForm.heroSlides || []).map((slide, i) => (
                                            <div key={i} className="flex items-start gap-2 bg-gray-50 rounded-xl p-3">
                                                {slide.image && <img src={slide.image} alt="" className="w-16 h-12 object-cover rounded-lg flex-shrink-0" />}
                                                <div className="flex-1 space-y-1.5">
                                                    <input type="text" value={slide.name} onChange={e => { const s = [...settingsForm.heroSlides]; s[i] = { ...s[i], name: e.target.value }; setSettingsForm({ ...settingsForm, heroSlides: s }); }} className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-xs" placeholder="Slide name" />
                                                    <input type="url" value={slide.image} onChange={e => { const s = [...settingsForm.heroSlides]; s[i] = { ...s[i], image: e.target.value }; setSettingsForm({ ...settingsForm, heroSlides: s }); }} className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-xs" placeholder="Image URL" />
                                                </div>
                                                <button onClick={() => { const s = settingsForm.heroSlides.filter((_, j) => j !== i); setSettingsForm({ ...settingsForm, heroSlides: s }); }} className="text-red-400 hover:text-red-600 p-1 mt-1"><TrashIcon /></button>
                                            </div>
                                        ))}
                                        <button onClick={() => setSettingsForm({ ...settingsForm, heroSlides: [...(settingsForm.heroSlides || []), { name: '', image: '' }] })} className="text-xs font-bold text-[#d4912a] hover:underline">+ Add Slide</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {settingsMsg && <div className={`text-sm font-medium px-4 py-2.5 rounded-xl ${settingsMsg.includes('Failed') ? 'text-red-600 bg-red-50' : 'text-green-600 bg-green-50'}`}>{settingsMsg}</div>}
                        <button onClick={handleSettingsSave} disabled={settingsSaving} className="bg-[#1a1a1a] text-white font-bold text-sm uppercase tracking-wider px-8 py-3 rounded-2xl hover:bg-[#333] transition-colors disabled:opacity-50">
                            {settingsSaving ? 'Saving...' : 'Save Settings'}
                        </button>
                    </div>
                </motion.div>
            )}
            {/* ═══ PRODUCT FORM MODAL ═══ */}
            <AnimatePresence>
                {showForm && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-3xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
                            <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
                                <h2 className="font-bold text-lg text-[#1a1a1a]">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                                <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all"><XIcon /></button>
                            </div>
                            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
                                <div><label className="block text-sm font-semibold text-gray-700 mb-1">Product Name *</label><input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent" placeholder="e.g. Sprout Harvest Bowl" /></div>
                                <div><label className="block text-sm font-semibold text-gray-700 mb-1">Short Description</label><input type="text" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent" placeholder="Brief description" /></div>
                                <div><label className="block text-sm font-semibold text-gray-700 mb-1">Long Description</label><textarea value={form.longDescription} onChange={e => setForm({ ...form, longDescription: e.target.value })} rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent resize-none" placeholder="Detailed description" /></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="block text-sm font-semibold text-gray-700 mb-1">Price (₹) *</label><input type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent" placeholder="349" /></div>
                                    <div><label className="block text-sm font-semibold text-gray-700 mb-1">Protein (per 100g)</label><input type="number" step="0.1" value={form.proteinPer100g} onChange={e => setForm({ ...form, proteinPer100g: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent" placeholder="25" /></div>
                                    <div><label className="block text-sm font-semibold text-gray-700 mb-1">Fiber (per 100g)</label><input type="number" step="0.1" value={form.fiberPer100g} onChange={e => setForm({ ...form, fiberPer100g: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent" placeholder="8" /></div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Main Image URL *</label>
                                    <input type="text" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent" placeholder="https://..." />
                                    {form.image && <img src={form.image} alt="Preview" className="mt-2 w-20 h-20 rounded-xl object-cover border" />}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Additional Image URLs <span className="text-gray-400 font-normal">(comma separated)</span></label>
                                    <textarea value={form.images} onChange={e => setForm({ ...form, images: e.target.value })} rows={2} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent resize-none" placeholder="https://image2.jpg, https://image3.jpg" />
                                    {form.images && (
                                        <div className="flex gap-2 mt-2 flex-wrap">
                                            {form.images.split(',').map(s => s.trim()).filter(Boolean).map((url, i) => (
                                                <img key={i} src={url} alt={`Preview ${i + 1}`} className="w-14 h-14 rounded-lg object-cover border" onError={e => e.target.style.display = 'none'} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Video URL <span className="text-gray-400 font-normal">(Cloudinary, YouTube, or direct link)</span></label>
                                    <input type="text" value={form.video} onChange={e => setForm({ ...form, video: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent" placeholder="https://res.cloudinary.com/.../video.mp4" />
                                    {form.video && <p className="text-xs text-green-600 mt-1 font-medium">✓ Video URL added</p>}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="block text-sm font-semibold text-gray-700 mb-1">Category</label><select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent"><option value="Salad">Salad</option><option value="Bowl">Bowl</option><option value="Smoothie">Smoothie</option><option value="Wrap">Wrap</option><option value="Snack">Snack</option><option value="Classic">Classic</option><option value="Premium">Premium</option></select></div>
                                    <div className="flex items-end"><label className="flex items-center gap-2 cursor-pointer py-3"><input type="checkbox" checked={form.isVegan} onChange={e => setForm({ ...form, isVegan: e.target.checked })} className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" /><span className="text-sm font-semibold text-gray-700">Vegan</span></label></div>
                                </div>
                                <div><label className="block text-sm font-semibold text-gray-700 mb-1">Ingredients (comma separated)</label><input type="text" value={form.ingredients} onChange={e => setForm({ ...form, ingredients: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent" placeholder="Kale, Quinoa, Avocado" /></div>
                                {formError && <div className="text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-xl font-medium">{formError}</div>}
                                {formSuccess && <div className="text-sm text-green-600 bg-green-50 px-4 py-2.5 rounded-xl font-medium">{formSuccess}</div>}
                                <button type="submit" className="w-full bg-[#1a1a1a] text-white font-bold text-sm uppercase tracking-wider py-3.5 rounded-2xl hover:bg-[#333] transition-colors">{editingProduct ? 'Update Product' : 'Create Product'}</button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminPage;
