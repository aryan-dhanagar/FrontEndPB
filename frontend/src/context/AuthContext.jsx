import { createContext, useContext, useState, useEffect } from 'react';
import { sendOTPApi, verifyOTPApi, updateProfileApi } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('ptb_user');
        return saved ? JSON.parse(saved) : null;
    });
    const [showOTPModal, setShowOTPModal] = useState(false);
    const [otpPurpose, setOtpPurpose] = useState('login'); // 'login' | 'checkout'
    const [onVerifyCallback, setOnVerifyCallback] = useState(null);

    useEffect(() => {
        if (user) {
            localStorage.setItem('ptb_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('ptb_user');
        }
    }, [user]);

    const isLoggedIn = !!user?.isVerified;

    const requestOTP = async (email) => {
        const result = await sendOTPApi(email);
        return result;
    };

    const verifyOTP = async (email, otp) => {
        const result = await verifyOTPApi(email, otp);
        if (result.user) {
            setUser(result.user);
        }
        return result;
    };

    const updateProfile = async (profileData) => {
        const updated = await updateProfileApi(profileData);
        setUser(updated);
        return updated;
    };

    const logout = () => {
        setUser(null);
        setShowOTPModal(false);
    };

    const openLogin = (purpose = 'login', callback = null) => {
        setOtpPurpose(purpose);
        setOnVerifyCallback(() => callback);
        setShowOTPModal(true);
    };

    const closeLogin = () => {
        setShowOTPModal(false);
        setOnVerifyCallback(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoggedIn,
                showOTPModal,
                otpPurpose,
                onVerifyCallback,
                requestOTP,
                verifyOTP,
                updateProfile,
                logout,
                openLogin,
                closeLogin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
