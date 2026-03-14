import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

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

/* ─── developer data ─── */
const developers = [
    {
        name: 'Aryan Dhanagar',
        initials: 'AD',
        role: 'Full Stack Developer',
        bio: 'Clean code, elegant design, building performant web apps with pixel-perfect interfaces.',
        image: '/images/developers/ad.jpg',
        gradient: 'from-amber-500 via-orange-500 to-red-500',
        skills: ['React', 'Node.js', 'Tailwind CSS', 'MongoDB', 'Express', 'JavaScript'],
        socials: {
            github: 'https://github.com/aryan-dhanagar',
            linkedin: 'https://www.linkedin.com/in/aryan-dhanagar-06b92b283/',
            instagram: 'https://www.instagram.com/ser_daryan/',
        },
    },
    {
        name: 'Parikshit Desai',
        initials: 'PD',
        role: 'Full Stack Developer',
        bio: 'Creative vision meets technical precision, crafting seamless experiences from frontend to backend.',
        image: '/images/developers/pd.jpeg',
        gradient: 'from-violet-500 via-purple-500 to-indigo-500',
        skills: ['React', 'Node.js', 'Tailwind CSS', 'MongoDB', 'Express', 'JavaScript'],
        socials: {
            github: 'https://github.com/Parikshit09-coder',
            linkedin: 'https://www.linkedin.com/in/parikshit-desai-7abb1328a/',
            instagram: 'https://www.instagram.com/parikshitdesai_',
        },
    },
];

/* ─── social icon SVGs ─── */
const SocialIcon = ({ type }) => {
    const icons = {
        github: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
        ),
        linkedin: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
        instagram: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
        ),
    };
    return icons[type] || null;
};

const DevelopersPage = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="bg-white">
            <section className="relative overflow-hidden bg-[#f5f0ea]">
                <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
                    <FadeIn>
                        <h1
                            className="font-sans font-black text-[#1a1a1a] uppercase leading-[0.9]"
                            style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', letterSpacing: '-0.03em' }}
                        >
                            Meet The<br />Developers.
                        </h1>
                    </FadeIn>
                </div>
            </section>

            {/* ═══════════════ DEVELOPER PROFILES ═══════════════ */}
            <section className="relative py-20 sm:py-28 lg:py-32 overflow-hidden">
                {/* Background image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-fixed"
                    style={{ backgroundImage: "url('/images/developers/devbg.jpg')" }}
                />
                <div className="absolute inset-0 bg-white/45" />

                <div className="relative max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
                    <FadeIn>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d4912a] mb-3 text-center">
                            The Team
                        </p>
                        <h2 className="font-sans text-3xl sm:text-4xl font-bold text-[#1a1a1a] text-center mb-16 leading-tight">
                            Crafted With <em className="italic text-[#d4912a]">Passion</em>
                        </h2>
                    </FadeIn>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                        {developers.map((dev, i) => (
                            <FadeIn key={dev.initials} delay={i * 0.15} direction={i === 0 ? 'right' : 'left'}>
                                <div className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500" style={{ minHeight: '600px' }}>
                                    {/* Background image */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                        style={{ backgroundImage: `url('${dev.image}')` }}
                                    />

                                    {/* Gradient overlay — dark at bottom for text */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />


                                    {/* Content positioned at bottom */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
                                        {/* Name & Role */}
                                        <h3 className="font-sans font-black text-2xl sm:text-3xl text-white uppercase tracking-tight mb-1">
                                            {dev.name}
                                        </h3>
                                        <p className="text-sm font-bold uppercase tracking-wider mb-4 text-white/80">
                                            {dev.role}
                                        </p>

                                        {/* Bio */}
                                        <p className="text-sm text-white/70 leading-relaxed mb-5 max-w-md">
                                            {dev.bio}
                                        </p>

                                        {/* Skills */}
                                        <div className="mb-5">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2.5">
                                                Tech Stack
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {dev.skills.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="inline-block text-[11px] font-bold text-white/90 bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1 rounded-full"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Social links */}
                                        <div className="flex items-center gap-3">
                                            {Object.entries(dev.socials).map(([platform, url]) => (
                                                <motion.a
                                                    key={platform}
                                                    href={url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    whileHover={{ scale: 1.15, y: -3 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/25 transition-colors duration-300 border border-white/10"
                                                    title={platform.charAt(0).toUpperCase() + platform.slice(1)}
                                                >
                                                    <SocialIcon type={platform} />
                                                </motion.a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════ QUOTE / CTA ═══════════════ */}
            <section className="bg-[#1a1a1a] py-20 sm:py-28">
                <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
                    <FadeIn>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400 mb-6">
                            Our Philosophy
                        </p>
                    </FadeIn>
                    <FadeIn delay={0.15}>
                        <blockquote
                            className="font-sans font-black text-white uppercase leading-[0.95] mb-8"
                            style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}
                        >
                            "Great products are built<br className="hidden sm:block" /> with great passion."
                        </blockquote>
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <p className="text-white/50 text-sm max-w-md mx-auto mb-10">
                            Every pixel, every interaction, every line of code we pour our hearts into making
                            Pro.tein.bites the best it can be.
                        </p>
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <div className="flex items-center justify-center gap-3 text-white/30 text-xs font-bold uppercase tracking-wider">
                            <span>Made with</span>
                            <span className="text-red-500 text-lg">❤</span>
                            <span>by AD / PD</span>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
};

export default DevelopersPage;

