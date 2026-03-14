import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const FadeIn = ({ children, delay = 0, className = '' }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const features = [
    {
        icon: '🥡',
        title: 'Eco‑Friendly Kraft Bowls',
        desc: 'Every meal is served in a sturdy, food-grade kraft paper bowl — biodegradable, microwave-safe, and leak-resistant. No plastic, ever.',
    },
    {
        icon: '🧤',
        title: 'Prepared with Gloves & Masks',
        desc: 'Our kitchen team follows strict hygiene protocols — gloves, masks, hairnets, and sanitised surfaces at every step of preparation.',
    },
    {
        icon: '🌡️',
        title: 'Temperature Controlled',
        desc: 'Bowls are packed immediately after preparation and sealed to lock in freshness, flavour, and the right serving temperature.',
    },
    {
        icon: '✅',
        title: 'Freshly Made, Never Frozen',
        desc: 'Every bowl is cooked fresh on the day of delivery. We never use frozen, pre-cooked, or reheated ingredients.',
    },
    {
        icon: '📦',
        title: 'Tamper-Proof Sealed Packaging',
        desc: 'Each order is sealed with a tamper-evident lid so you know your food hasn\'t been opened or touched during delivery.',
    },
    {
        icon: '🥦',
        title: 'Farm-Fresh Ingredients',
        desc: 'We source vegetables, grains, and proteins fresh daily from trusted local suppliers — vibrant colours, real nutrition.',
    },
];

const PackagingSection = () => {
    return (
        <section className="py-16 sm:py-24 bg-[#fdf8f0]">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
                {/* Header */}
                <FadeIn>
                    <div className="text-center mb-12 sm:mb-16">
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d4912a] mb-3">
                            What You Receive
                        </p>
                        <h2
                            className="font-sans font-black text-[#1a1a1a] uppercase leading-[0.95]"
                            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}
                        >
                            Packed with Care,<br />Delivered Fresh
                        </h2>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Image */}
                    <FadeIn>
                        <div className="relative">
                            <div className="rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src="/images/package.jpeg"
                                    alt="Pro.tein.bites packaging — fresh protein bowl in eco-friendly kraft bowl"
                                    className="w-full aspect-[4/5] sm:aspect-square object-cover"
                                />
                            </div>
                            {/* Floating badge */}
                            <div className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 bg-white rounded-2xl shadow-lg px-5 py-3 sm:px-6 sm:py-4">
                                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#8a8580]">100%</p>
                                <p className="text-sm sm:text-base font-black text-[#1a1a1a]">Healthy</p>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Features grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                        {features.map((f, i) => (
                            <FadeIn key={i} delay={i * 0.08}>
                                <div className="group">
                                    <span className="text-2xl sm:text-3xl block mb-2">{f.icon}</span>
                                    <h3 className="font-bold text-[#1a1a1a] text-sm sm:text-[15px] mb-1.5 group-hover:text-[#d4912a] transition-colors">
                                        {f.title}
                                    </h3>
                                    <p className="text-[13px] text-[#6a6560] leading-relaxed">
                                        {f.desc}
                                    </p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PackagingSection;
