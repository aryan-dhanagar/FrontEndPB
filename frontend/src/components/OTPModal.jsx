import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const OTPModal = () => {
    const { showOTPModal, closeLogin, requestOTP, verifyOTP, updateProfile, otpPurpose, onVerifyCallback } = useAuth();
    const [step, setStep] = useState('email'); // 'email' | 'otp' | 'profile'
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [countdown, setCountdown] = useState(0);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const inputRefs = useRef([]);

    useEffect(() => {
        if (!showOTPModal) {
            setStep('email');
            setEmail('');
            setOtp(['', '', '', '', '', '']);
            setError('');
            setCountdown(0);
            setName('');
            setPhone('');
            setAddress('');
        }
    }, [showOTPModal]);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const handleSendOTP = async (e) => {
        e.preventDefault();
        if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
            setError('Enter a valid email address');
            return;
        }
        setLoading(true);
        setError('');
        try {
            await requestOTP(email);
            setStep('otp');
            setCountdown(60);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        const otpString = otp.join('');
        if (otpString.length !== 6) {
            setError('Enter the complete 6-digit code');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const result = await verifyOTP(email, otpString);
            // If new user (no name), ask for profile
            if (!result.user.name) {
                setStep('profile');
            } else {
                closeLogin();
                if (onVerifyCallback) onVerifyCallback(result.user);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (countdown > 0) return;
        setLoading(true);
        setError('');
        try {
            await requestOTP(email);
            setOtp(['', '', '', '', '', '']);
            setCountdown(60);
        } catch (err) {
            setError('Failed to resend OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) {
            setError('Name is required');
            return;
        }
        setLoading(true);
        setError('');
        try {
            await updateProfile({ email, name, phone, address });
            closeLogin();
            if (onVerifyCallback) onVerifyCallback();
        } catch (err) {
            setError('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    if (!showOTPModal) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                onClick={closeLogin}
            >
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="relative bg-white rounded-3xl shadow-2xl p-8 sm:p-10 w-full max-w-md"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close */}
                    <button
                        onClick={closeLogin}
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Logo */}
                    <div className="text-center mb-8">
                        <h2 className="font-logo text-2xl text-[#1a1a1a]">pro.tein.bites</h2>
                        <p className="text-[10px] font-semibold tracking-[0.2em] text-gray-400 uppercase mt-1">
                            {otpPurpose === 'checkout' ? 'Verify to Continue' : 'Sign In / Sign Up'}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 px-4 py-2.5 bg-red-50 text-red-600 text-sm rounded-xl text-center font-medium">
                            {error}
                        </div>
                    )}

                    {/* STEP: Email */}
                    {step === 'email' && (
                        <form onSubmit={handleSendOTP}>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                                placeholder="you@example.com"
                                autoFocus
                                className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent transition-all placeholder:text-gray-300"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-4 bg-[#1a1a1a] text-white font-bold text-sm uppercase tracking-wider py-3.5 rounded-2xl hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Sending...' : 'Send Verification Code'}
                            </button>
                        </form>
                    )}

                    {/* STEP: OTP */}
                    {step === 'otp' && (
                        <form onSubmit={handleVerifyOTP}>
                            <p className="text-sm text-gray-500 text-center mb-6">
                                We sent a 6-digit code to<br />
                                <strong className="text-[#1a1a1a]">{email}</strong>
                            </p>
                            <div className="flex justify-center gap-2.5 mb-6">
                                {otp.map((digit, i) => (
                                    <input
                                        key={i}
                                        ref={el => inputRefs.current[i] = el}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(i, e.target.value)}
                                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                                        autoFocus={i === 0}
                                        className="w-12 h-14 text-center text-xl font-black border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#1a1a1a] focus:ring-1 focus:ring-[#1a1a1a] transition-all"
                                    />
                                ))}
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#1a1a1a] text-white font-bold text-sm uppercase tracking-wider py-3.5 rounded-2xl hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Verifying...' : 'Verify Code'}
                            </button>
                            <div className="text-center mt-4">
                                {countdown > 0 ? (
                                    <p className="text-xs text-gray-400">Resend in {countdown}s</p>
                                ) : (
                                    <button type="button" onClick={handleResend} className="text-xs font-semibold text-[#d4912a] hover:underline">
                                        Resend Code
                                    </button>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => { setStep('email'); setOtp(['', '', '', '', '', '']); setError(''); }}
                                className="w-full mt-2 text-xs text-gray-400 hover:text-gray-600"
                            >
                                ← Change email
                            </button>
                        </form>
                    )}

                    {/* STEP: Profile (new user) */}
                    {step === 'profile' && (
                        <form onSubmit={handleProfileSubmit}>
                            <p className="text-sm text-gray-500 text-center mb-6">
                                Almost there! Tell us about yourself.
                            </p>
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your Name *"
                                    autoFocus
                                    className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent transition-all placeholder:text-gray-300"
                                />
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Phone Number"
                                    className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent transition-all placeholder:text-gray-300"
                                />
                                <textarea
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Delivery Address"
                                    rows={2}
                                    className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent transition-all placeholder:text-gray-300 resize-none"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-4 bg-[#1a1a1a] text-white font-bold text-sm uppercase tracking-wider py-3.5 rounded-2xl hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Saving...' : 'Continue'}
                            </button>
                        </form>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default OTPModal;
