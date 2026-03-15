import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api`
    : '/api';

const api = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ─── Products ───
export const getProducts = async () => {
    const { data } = await api.get('/products');
    return data;
};

export const getProductBySlug = async (slug) => {
    const { data } = await api.get(`/products/${slug}`);
    return data;
};

// ─── Auth ───
export const sendOTPApi = async (email) => {
    const { data } = await api.post('/auth/send-otp', { email });
    return data;
};

export const verifyOTPApi = async (email, otp) => {
    const { data } = await api.post('/auth/verify-otp', { email, otp });
    return data;
};

export const updateProfileApi = async (profileData) => {
    const { data } = await api.put('/auth/profile', profileData);
    return data;
};

export const getProfileApi = async (email) => {
    const { data } = await api.get(`/auth/profile/${email}`);
    return data;
};

// ─── Orders ───
export const createRazorpayOrder = async (amount) => {
    const { data } = await api.post('/orders/create-razorpay-order', { amount });
    return data;
};

export const createOrder = async (orderData) => {
    const { data } = await api.post('/orders', orderData);
    return data;
};

export const getOrderTracking = async (orderId) => {
    const { data } = await api.get(`/orders/track/${orderId}`);
    return data;
};

export const getOrderHistory = async (email) => {
    const { data } = await api.get(`/orders/history/${email}`);
    return data;
};

// ─── Public Settings & Availability ───
export const getSettings = async () => {
    const { data } = await api.get('/settings');
    return data;
};

export const getSlotAvailability = async (date) => {
    const { data } = await api.get(`/orders/slot-availability?date=${date}`);
    return data;
};

export const getStockCheck = async (date) => {
    const { data } = await api.get(`/orders/stock-check?date=${date}`);
    return data;
};

// ─── Admin (auth helpers) ───
const getAdminToken = () => localStorage.getItem('adminToken');

const adminHeaders = () => ({
    headers: { Authorization: `Bearer ${getAdminToken()}` },
});

export const adminLogin = async (email, password) => {
    const { data } = await api.post('/admin/login', { email, password });
    return data;
};

export const adminVerify = async () => {
    const { data } = await api.get('/admin/verify', adminHeaders());
    return data;
};

// Protected admin endpoints
export const adminCreateProduct = async (productData) => {
    const { data } = await api.post('/admin/products', productData, adminHeaders());
    return data;
};

export const adminUpdateProduct = async (id, productData) => {
    const { data } = await api.put(`/admin/products/${id}`, productData, adminHeaders());
    return data;
};

export const adminDeleteProduct = async (id) => {
    const { data } = await api.delete(`/admin/products/${id}`, adminHeaders());
    return data;
};

export const adminUpdateProductStock = async (id, dailyStock) => {
    const { data } = await api.put(`/admin/products/${id}/stock`, { dailyStock }, adminHeaders());
    return data;
};

export const adminGetOrders = async () => {
    const { data } = await api.get('/admin/orders', adminHeaders());
    return data;
};

export const adminGetOrdersBySlot = async (date, slot) => {
    const params = new URLSearchParams({ date });
    if (slot) params.append('slot', slot);
    const { data } = await api.get(`/admin/orders/by-slot?${params}`, adminHeaders());
    return data;
};

export const adminUpdateOrderStatus = async (id, status, note) => {
    const { data } = await api.put(`/admin/orders/${id}/status`, { status, note }, adminHeaders());
    return data;
};

export const adminUpdateSettings = async (settingsData) => {
    const { data } = await api.put('/admin/settings', settingsData, adminHeaders());
    return data;
};

// ─── Reviews ───
export const submitReview = async (orderId, email, reviews) => {
    const { data } = await api.post(`/reviews/${orderId}`, { email, reviews });
    return data;
};

export const getProductReviews = async (productId) => {
    const { data } = await api.get(`/reviews/product/${productId}`);
    return data;
};

export const getOrderForReview = async (orderId, email) => {
    const { data } = await api.get(`/reviews/order/${orderId}?email=${email}`);
    return data;
};

export default api;

