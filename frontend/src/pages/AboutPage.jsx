import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';

/* ─── reusable fade-in wrapper ─── */
const FadeIn = ({ children, delay = 0, direction = 'up', className = '' }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    const dirs = {
        up: { y: 50, x: 0 },
        down: { y: -50, x: 0 },
        left: { x: 50, y: 0 },
        right: { x: -50, y: 0 },
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, ...dirs[direction] }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

/* ─── salad gallery images ─── */
const galleryImages = [
    {
        src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80',
        alt: 'Vibrant veggie bowl',
    },
    {
        src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
        alt: 'Fresh salad platter',
    },
    {
        src: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80',
        alt: 'Green sprout bowl',
    },
    {
        src: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80',
        alt: 'Paneer protein bowl',
    },
    {
        src: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=600&q=80',
        alt: 'Colorful healthy meal',
    },
    {
        src: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&q=80',
        alt: 'Fresh ingredients spread',
    },
];



/* ─── values / pillars ─── */
const values = [
    { icon: '🌿', title: 'Farm Fresh', text: 'Every ingredient is sourced from local, certified-organic farms within 50 km.' },
    { icon: '🧬', title: 'Nutritionist Backed', text: 'Each recipe is designed with registered dietitians to hit precise macros.' },
    { icon: '♻️', title: 'Sustainable', text: 'Compostable packaging, zero single-use plastic, and carbon-neutral delivery.' },
    { icon: '⚡', title: 'Fast Delivery', text: 'From our kitchen to your doorstep in under 45 minutes, guaranteed fresh.' },
];

const AboutPage = () => {
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                if (data && data.length > 0) {
                    setProducts(data.slice(0, 4).map(p => ({ ...p, id: p._id || p.slug })));
                }
            } catch (err) {
                console.error('Failed to fetch products:', err);
            } finally {
                setProductsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="bg-white">
            {/* ═══════════════ HERO BANNER (with founder background) ═══════════════ */}
            <section className="relative overflow-hidden bg-[#f5f0ea]" style={{ minHeight: '500px' }}>
                {/* Background image — positioned to the right so founders' faces are visible */}
                <div
                    className="absolute inset-0 bg-no-repeat"
                    style={{
                        backgroundImage: "url('/images/founders.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                    }}
                />
                {/* Gradient overlay: dark on left (text area) → transparent on right (faces) */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent" />

                <div className="relative max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-36">
                    <div className="max-w-lg">
                        <FadeIn delay={0.15}>
                            <h1
                                className="font-sans font-black text-white uppercase leading-[0.9] mb-5"
                                style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', letterSpacing: '-0.03em' }}
                            >
                                The<br />FOUNDERS.
                            </h1>
                        </FadeIn>
                    </div>
                </div>
                <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-[#d4912a]/20 to-transparent rounded-full blur-3xl pointer-events-none" />
            </section>

            {/* ═══════════════ OUR STORY ═══════════════ */}
            <section className="py-16 sm:py-24 bg-white">
                <div className="max-w-[800px] mx-auto px-6 sm:px-8">
                    <FadeIn>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d4912a] mb-3 text-center">
                            Our Story
                        </p>
                        <h2 className="font-display text-3xl sm:text-4xl text-[#1a1a1a] text-center mb-10 leading-tight">
                            How It All <em className="italic text-[#d4912a]">Started</em>
                        </h2>
                    </FadeIn>

                    <div className="text-[#4a4a4a] text-base sm:text-lg leading-relaxed space-y-5">
                        <FadeIn delay={0.1}>
                            <p>
                                Some friendships are built over coffees.<br />
                                Ours was built over protein shakes and gym rants.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.15}>
                            <p>
                                Protein Bites was founded by <strong className="text-[#1a1a1a]">Videe</strong> — the chaotic but determined duo <strong className="text-[#1a1a1a]">Vidya + Deepali</strong> — who were tired of the same old sad &quot;healthy food&quot; situation. You know the one: bland salads, depressing diet plates, and food that makes you question all your life choices.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <p className="text-[#1a1a1a] font-semibold text-lg sm:text-xl">
                                We thought — what if healthy food didn&apos;t feel like punishment?
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.25}>
                            <p>
                                So we started experimenting with meals that are high-protein, filling, and actually exciting to eat. Think creamy, crunchy, spicy, fresh — the kind of food that fuels your workout <em>and</em> your mood.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <p>
                                Because honestly?<br />
                                <strong className="text-[#1a1a1a]">Eating healthy shouldn&apos;t mean eating boring.</strong>
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.35}>
                            <p>
                                At Protein Bites, we&apos;re here for the gym rats, the &quot;trying to be healthy&quot; people, the late-night protein cravers, and everyone who wants food that works as hard as they do.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.4}>
                            <p>
                                Every dish we make is packed with protein, good ingredients, and a little bit of our personality (which is 50% chaos and 50% determination).
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.45}>
                            <p>
                                What started as two friends complaining about boring diet food is now a small kitchen with a big mission:
                            </p>
                            <p className="text-[#d4912a] font-bold text-xl sm:text-2xl mt-2">
                                Make healthy food feel exciting again.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.5}>
                            <p>
                                So if you&apos;re here for strong bodies, good vibes, and food that actually slaps — <strong className="text-[#1a1a1a]">welcome to the club.</strong>
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.55}>
                            <p className="pt-4 text-[#1a1a1a] font-semibold italic text-right">
                                — Videe<br />
                                <span className="text-sm font-normal text-[#8a8580] not-italic">(Vidya + Deepali)</span>
                            </p>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ═══════════════ SAMARTHA CREDITS ═══════════════ */}
            <section className="bg-[#fdf8f0] py-12 sm:py-16">
                <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
                    <FadeIn>
                        <div className="flex flex-row items-center justify-center gap-8 sm:gap-12">
                            <div className="flex-shrink-0 w-28 h-28 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shadow-lg">
                                <img
                                    src="/images/samartha.jpeg"
                                    alt="Samartha"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-lg sm:text-xl font-semibold text-[#1a1a1a] mb-1">
                                    All credits to Samartha.
                                </p>
                                <p className="text-base sm:text-lg text-[#d4912a] font-bold italic">
                                    Jai Jai Raghuveer Samartha
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ═══════════════ OUR MISSION ═══════════════ */}
            <section className="py-20 sm:py-28 lg:py-32">
                <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div>
                            <FadeIn>
                                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d4912a] mb-3">
                                    Our Mission
                                </p>
                            </FadeIn>
                            <FadeIn delay={0.1}>
                                <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] text-navy-900 leading-tight mb-6">
                                    Built for people who <em className="italic text-olive-600">refuse to settle</em>
                                </h2>
                            </FadeIn>
                            <FadeIn delay={0.2}>
                                <p className="text-[#4a4a4a] leading-relaxed mb-4">
                                    We started with a single question: <em>"Why can't fast food be genuinely good for you?"</em>
                                    Every Pro.tein.bites bowl is the answer — high protein, balanced macros, bold flavours, and zero guilt.
                                </p>
                            </FadeIn>
                            <FadeIn delay={0.3}>
                                <p className="text-[#4a4a4a] leading-relaxed">
                                    From sourcing organic sprouts at dawn to perfecting our signature crème drizzle,
                                    every detail of our process is designed to deliver nutrition without compromise.
                                </p>
                            </FadeIn>
                        </div>
                        <FadeIn direction="left" delay={0.2}>
                            <div className="relative rounded-[25px] overflow-hidden aspect-[4/5]">
                                <img
                                    src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80"
                                    alt="Fresh ingredients spread"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-sm px-5 py-4 rounded-xl">
                                    <p className="text-3xl font-black text-[#1a1a1a]">4.9<span className="text-amber-500 text-lg ml-1">★</span></p>
                                    <p className="text-xs font-medium text-[#8a8580] uppercase tracking-wider">Avg. Rating</p>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ═══════════════ VALUES ═══════════════ */}
            <section className="bg-[#f5f0ea] py-20 sm:py-24">
                <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
                    <FadeIn>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8a8580] mb-3 text-center">
                            Why Us
                        </p>
                        <h2 className="font-display text-3xl sm:text-4xl text-navy-900 text-center mb-14 leading-tight">
                            What We <em className="italic text-olive-600">Stand For</em>
                        </h2>
                    </FadeIn>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((v, i) => (
                            <FadeIn key={i} delay={i * 0.1}>
                                <div className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                                    <span className="text-3xl mb-4 block">{v.icon}</span>
                                    <h3 className="font-bold text-[#1a1a1a] text-lg mb-2">{v.title}</h3>
                                    <p className="text-sm text-[#6a6a6a] leading-relaxed">{v.text}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════ SALAD GALLERY ═══════════════ */}
            <section className="py-20 sm:py-28 lg:py-32 overflow-hidden">
                <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
                    <FadeIn>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d4912a] mb-3 text-center">
                            Fresh From the Kitchen
                        </p>
                        <h2 className="font-display text-3xl sm:text-4xl text-navy-900 text-center mb-14 leading-tight">
                            A Glimpse Into <em className="italic text-olive-600">Our Bowls</em>
                        </h2>
                    </FadeIn>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                        {galleryImages.map((img, i) => (
                            <FadeIn key={i} delay={i * 0.08} direction={i % 2 === 0 ? 'up' : 'left'}>
                                <div className="relative overflow-hidden rounded-2xl group">
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        loading="lazy"
                                        className="w-full aspect-square object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <p className="absolute bottom-4 left-4 text-white text-sm font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                                        {img.alt}
                                    </p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════ SIGNATURE ITEMS (from Database) ═══════════════ */}
            <section className="bg-navy-900 text-white py-20 sm:py-28 lg:py-32">
                <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
                    <FadeIn>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400 mb-3 text-center">
                            The Lineup
                        </p>
                        <h2 className="font-display text-3xl sm:text-4xl text-white text-center mb-16 leading-tight">
                            Our Signature <em className="italic text-amber-400">Bowls</em>
                        </h2>
                    </FadeIn>

                    {productsLoading ? (
                        /* Loading skeleton */
                        <div className="space-y-20 lg:space-y-28">
                            {[1, 2, 3, 4].map(n => (
                                <div key={n} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center animate-pulse">
                                    <div className="rounded-[25px] bg-white/10 aspect-[4/3]" />
                                    <div className="space-y-4">
                                        <div className="h-4 w-24 bg-white/10 rounded" />
                                        <div className="h-8 w-3/4 bg-white/10 rounded" />
                                        <div className="h-20 w-full bg-white/10 rounded" />
                                        <div className="h-6 w-32 bg-white/10 rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : products.length === 0 ? (
                        <p className="text-center text-white/50 text-lg">No products available right now.</p>
                    ) : (
                        <div className="space-y-20 lg:space-y-28">
                            {products.map((item, i) => {
                                const pid = item._id || item.slug || item.id;
                                return (
                                    <div
                                        key={pid}
                                        className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 !== 0 ? 'lg:[direction:rtl]' : ''}`}
                                    >
                                        <FadeIn direction={i % 2 === 0 ? 'right' : 'left'} delay={0.1}>
                                            <div className="rounded-[25px] overflow-hidden lg:[direction:ltr]">
                                                <motion.img
                                                    src={item.image}
                                                    alt={item.name}
                                                    loading="lazy"
                                                    className="w-full aspect-[4/3] object-cover"
                                                    whileHover={{ scale: 1.05 }}
                                                    transition={{ duration: 0.6, ease: 'easeOut' }}
                                                />
                                            </div>
                                        </FadeIn>
                                        <div className="lg:[direction:ltr]">
                                            <FadeIn delay={0.15}>
                                                <div className="flex items-center gap-3 mb-3">
                                                    {item.proteinPer100g && (
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 border border-amber-400/40 px-3 py-1 rounded-full">
                                                            {item.proteinPer100g}g PROTEIN/100g
                                                        </span>
                                                    )}
                                                    {item.isVegan && (
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/60 border border-white/20 px-3 py-1 rounded-full">
                                                            VEGAN
                                                        </span>
                                                    )}
                                                    {item.category && (
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/60 border border-white/20 px-3 py-1 rounded-full">
                                                            {item.category}
                                                        </span>
                                                    )}
                                                </div>
                                            </FadeIn>
                                            <FadeIn delay={0.25}>
                                                <h3 className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tight mb-4">
                                                    {item.name}
                                                </h3>
                                            </FadeIn>
                                            <FadeIn delay={0.35}>
                                                <p className="text-white/70 leading-relaxed mb-6 max-w-md">
                                                    {item.description}
                                                </p>
                                            </FadeIn>
                                            <FadeIn delay={0.45}>
                                                <div className="flex items-center gap-6">
                                                    <span className="text-2xl font-black">₹{item.price.toFixed(2)}</span>
                                                    <Link
                                                        to={`/product/${item.slug || item._id}`}
                                                        className="inline-block bg-amber-500 hover:bg-amber-400 text-navy-900 text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full transition-colors duration-300"
                                                    >
                                                        Order Now
                                                    </Link>
                                                </div>
                                            </FadeIn>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* ═══════════════ CTA BANNER ═══════════════ */}
            <section className="py-20 sm:py-28 bg-white">
                <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
                    <FadeIn>
                        <h2
                            className="font-sans font-black text-[#1a1a1a] uppercase leading-[0.9] mb-6"
                            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.03em' }}
                        >
                            Ready to Eat Clean?
                        </h2>
                    </FadeIn>
                    <FadeIn delay={0.15}>
                        <p className="text-[#6a6a6a] text-base sm:text-lg max-w-lg mx-auto mb-8">
                            Explore our full menu and find the bowl that matches your goals.
                        </p>
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <Link
                            to="/"
                            className="inline-block bg-[#1a1a1a] hover:bg-[#333] text-white text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-full transition-colors duration-300"
                        >
                            Browse Menu
                        </Link>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
