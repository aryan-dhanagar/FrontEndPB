import { useState, useEffect } from 'react';
import { getSettings } from '../services/api';

const defaultSlides = [
    { name: 'Fresh Bowls', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&q=80' },
    { name: 'Healthy Meals', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&q=80' },
    { name: 'Premium Ingredients', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=900&q=80' },
    { name: 'Protein Power', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&q=80' },
];

const HeroSection = () => {
    const [current, setCurrent] = useState(0);
    const [slides, setSlides] = useState(defaultSlides);
    const [videoUrl, setVideoUrl] = useState(null);
    const [videoLoading, setVideoLoading] = useState(true);
    const [videoError, setVideoError] = useState(false);

    // Load hero config from settings
    useEffect(() => {
        getSettings()
            .then(s => {
                if (s.heroSlides && s.heroSlides.length > 0) setSlides(s.heroSlides);
                if (s.heroVideo) setVideoUrl(s.heroVideo);
                setVideoLoading(false);
            })
            .catch(() => setVideoLoading(false));
    }, []);

    useEffect(() => {
        if (slides.length === 0) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [slides]);

    return (
        <section id="hero" className="w-full">
            {/* Desktop: 30/70 split | Mobile/Tablet: stacked */}
            <div className="flex flex-col md:flex-row w-full md:h-[480px] lg:h-[560px] gap-2 sm:gap-3 p-2 sm:p-3">
                {/* Left: Video (only admin video, loading shimmer until ready) */}
                <div className="w-full md:w-[30%] h-[55vh] sm:h-[50vh] md:h-full rounded-[20px] sm:rounded-[25px] overflow-hidden">
                    {videoLoading ? (
                        /* Shimmer loading while fetching settings */
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 animate-pulse flex items-center justify-center">
                            <div className="w-10 h-10 border-3 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                        </div>
                    ) : !videoUrl || videoError ? (
                        <img src={slides[0]?.image || defaultSlides[0].image} alt="Hero" className="w-full h-full object-cover" />
                    ) : (
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            webkit-playsinline="true"
                            preload="auto"
                            poster={slides[0]?.image || defaultSlides[0].image}
                            className="w-full h-full object-cover"
                            key={videoUrl}
                            onError={() => setVideoError(true)}
                        >
                            <source src={videoUrl} type="video/mp4" />
                        </video>
                    )}
                </div>

                {/* Right: Slideshow — 60vh on mobile, 70% on desktop */}
                <div className="w-full md:w-[70%] h-[45vh] sm:h-[50vh] md:h-full relative overflow-hidden rounded-[20px] sm:rounded-[25px]">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className="absolute inset-0 transition-opacity duration-300 ease-in-out"
                            style={{ opacity: index === current ? 1 : 0 }}
                        >
                            <img
                                src={slide.image}
                                alt={slide.name}
                                loading="lazy"
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay card */}
                            <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 lg:bottom-10 lg:left-10 bg-white/80 backdrop-blur-sm px-4 py-3 sm:px-6 sm:py-5">
                                <h3 className="font-display font-bold text-navy-900 text-base sm:text-lg lg:text-xl leading-tight mb-1.5 sm:mb-2">
                                    {slide.name}
                                </h3>
                                <a
                                    href="#signature-selection"
                                    className="inline-block bg-navy-900 text-white text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-navy-800 transition-colors duration-300"
                                >
                                    Order Now
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trust Badge Marquee */}
            <div className="border-t border-gray-100 bg-white py-4 overflow-hidden">
                <div className="flex animate-marquee">
                    {/* Set 1 */}
                    <div className="flex shrink-0 items-center gap-10 px-5 text-xs sm:text-[13px] font-medium text-gray-600 tracking-wide uppercase whitespace-nowrap">
                        <span className="flex items-center gap-2"><span className="text-base">🌿</span> Farm Fresh &amp; Organic</span>
                        <span className="flex items-center gap-2"><span className="text-base">🍽</span> Nutritionist Approved</span>
                        <span className="flex items-center gap-2"><span className="text-base">⏱</span> Fast Delivery</span>
                        <span className="flex items-center gap-2"><span className="text-base">📦</span> Sustainable Packaging</span>
                        <span className="flex items-center gap-2"><span className="text-base">💪</span> High Protein</span>
                    </div>
                    {/* Set 2 (duplicate for seamless loop) */}
                    <div className="flex shrink-0 items-center gap-10 px-5 text-xs sm:text-[13px] font-medium text-gray-600 tracking-wide uppercase whitespace-nowrap">
                        <span className="flex items-center gap-2"><span className="text-base">🌿</span> Farm Fresh &amp; Organic</span>
                        <span className="flex items-center gap-2"><span className="text-base">🍽</span> Nutritionist Approved</span>
                        <span className="flex items-center gap-2"><span className="text-base">⏱</span> Fast Delivery</span>
                        <span className="flex items-center gap-2"><span className="text-base">📦</span> Sustainable Packaging</span>
                        <span className="flex items-center gap-2"><span className="text-base">💪</span> High Protein</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
