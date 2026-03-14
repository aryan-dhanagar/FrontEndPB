import { useRef, useEffect } from 'react';
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

const contactCards = [
    {
        emoji: '💬',
        title: 'Feedback & Quality Issues',
        description: 'Had a problem with your order? Let us know and we\'ll make it right.',
        email: 'proteinbites.feedback@gmail.com',
        color: 'from-orange-400 to-amber-500',
        bgLight: 'bg-amber-50',
    },
    {
        emoji: '❓',
        title: 'General Queries',
        description: 'Questions about our menu, ingredients, delivery, or anything else? We\'re here to help.',
        email: 'proteinbites.query@gmail.com',
        color: 'from-emerald-400 to-teal-500',
        bgLight: 'bg-emerald-50',
    },
];

const ContactPage = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="bg-[#f5f0ea] py-14 sm:py-20">
                <div className="max-w-[800px] mx-auto px-6 sm:px-8">
                    <FadeIn>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8a8580] mb-3">Get In Touch</p>
                        <h1
                            className="font-sans font-black text-[#1a1a1a] uppercase leading-[0.95] mb-4"
                            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.03em' }}
                        >
                            Contact Us
                        </h1>
                        <p className="text-base text-[#4a4a4a] leading-relaxed max-w-lg">
                            We'd love to hear from you. Whether it's feedback, a question, or just to say hi and reach out anytime.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Contact Cards */}
            <section className="py-14 sm:py-20">
                <div className="max-w-[800px] mx-auto px-6 sm:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {contactCards.map((card, i) => (
                            <FadeIn key={i} delay={i * 0.1}>
                                <div className={`${card.bgLight} rounded-2xl p-6 sm:p-8 h-full flex flex-col`}>
                                    <span className="text-3xl mb-3">{card.emoji}</span>
                                    <h3 className="font-bold text-lg text-[#1a1a1a] mb-2">{card.title}</h3>
                                    <p className="text-sm text-[#6a6a6a] leading-relaxed mb-5 flex-1">{card.description}</p>
                                    <a
                                        href={`mailto:${card.email}`}
                                        className="inline-flex items-center gap-2 text-sm font-bold text-[#1a1a1a] hover:text-[#d4912a] transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                        </svg>
                                        {card.email}
                                    </a>
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    {/* WhatsApp Section */}
                    <FadeIn delay={0.2}>
                        <div className="mt-8 bg-[#1a1a1a] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-green-500 flex items-center justify-center shrink-0">
                                <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </div>
                            <div className="text-center sm:text-left flex-1">
                                <h3 className="font-bold text-lg text-white mb-1">Chat on WhatsApp</h3>
                                <p className="text-sm text-white/60">Quick replies, order updates, and real-time support.</p>
                            </div>
                            <a
                                href="https://wa.me/919082378498"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-green-500 text-white font-bold text-sm uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-green-600 transition-colors"
                            >
                                Message Us
                            </a>
                        </div>
                    </FadeIn>

                    {/* Instagram */}
                    <FadeIn delay={0.3}>
                        <div className="mt-6 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-2xl p-[2px]">
                            <div className="bg-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center shrink-0">
                                    <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                    </svg>
                                </div>
                                <div className="text-center sm:text-left flex-1">
                                    <h3 className="font-bold text-lg text-[#1a1a1a] mb-1">Follow us on Instagram</h3>
                                    <p className="text-sm text-[#6a6a6a]">Stay updated with our latest bowls, offers, and behind-the-scenes content.</p>
                                </div>
                                <a
                                    href="https://www.instagram.com/pro.tein.bites/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white font-bold text-sm uppercase tracking-wider px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
                                >
                                    Follow Us
                                </a>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
