import { useState, useEffect } from 'react';
import { getSettings } from '../services/api';

const KitchenClosedBanner = () => {
    const [isClosed, setIsClosed] = useState(false);

    useEffect(() => {
        const checkSlots = async () => {
            try {
                const data = await getSettings();
                const slots = data?.deliverySlots || [];
                if (slots.length === 0) {
                    setIsClosed(true);
                }
            } catch (err) {
                console.error('Failed to check kitchen status:', err);
            }
        };
        checkSlots();
    }, []);

    if (!isClosed) return null;

    return (
        <div
            className="relative overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 40%, #24243e 100%)',
            }}
        >
            {/* Animated glow orbs */}
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-cyan-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />

            <div className="relative px-4 py-3 sm:py-4 text-center">
                <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
                    <span className="text-lg sm:text-xl">🌙</span>
                    <p
                        className="text-sm sm:text-base font-semibold tracking-wide"
                        style={{
                            background: 'linear-gradient(90deg, #60a5fa, #a78bfa, #60a5fa)',
                            backgroundSize: '200% auto',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            animation: 'shimmer 3s linear infinite',
                        }}
                    >
                        The kitchen is taking a break for tomorrow. Orders are currently paused.
                    </p>
                    <span className="text-lg sm:text-xl">🌙</span>
                </div>
                <p className="text-white/40 text-xs mt-1">Check back tomorrow for fresh slots!</p>
            </div>

            <style>{`
                @keyframes shimmer {
                    0% { background-position: 200% center; }
                    100% { background-position: -200% center; }
                }
            `}</style>
        </div>
    );
};

export default KitchenClosedBanner;
