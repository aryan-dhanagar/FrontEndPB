import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

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

const Section = ({ title, children }) => (
    <FadeIn>
        <div className="mb-10">
            <h2 className="font-bold text-xl sm:text-2xl text-[#1a1a1a] mb-4">{title}</h2>
            <div className="text-[#4a4a4a] text-[15px] leading-relaxed space-y-3">{children}</div>
        </div>
    </FadeIn>
);

const RefundPolicyPage = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="bg-[#f5f0ea] py-16 sm:py-24">
                <div className="max-w-[800px] mx-auto px-6 sm:px-8">
                    <FadeIn>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8a8580] mb-3">Policies</p>
                        <h1
                            className="font-sans font-black text-[#1a1a1a] uppercase leading-[0.95] mb-4"
                            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.03em' }}
                        >
                            Refund Policy
                        </h1>
                        <p className="text-sm text-[#8a8580]">Last updated: 14 March 2026</p>
                    </FadeIn>
                </div>
            </section>

            {/* Content */}
            <section className="py-14 sm:py-20">
                <div className="max-w-[800px] mx-auto px-6 sm:px-8">

                    {/* Highlight box */}
                    <FadeIn>
                        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 sm:p-8 mb-12 text-center">
                            <p className="text-3xl mb-3">🚫</p>
                            <h2 className="font-black text-xl sm:text-2xl text-[#1a1a1a] uppercase mb-2">No Refunds</h2>
                            <p className="text-[#4a4a4a] text-sm max-w-md mx-auto">
                                All sales on Pro.tein.bites are <strong>final</strong>. Once payment is completed, no refunds will be issued.
                            </p>
                        </div>
                    </FadeIn>

                    <Section title="1. All Sales Are Final">
                        <p>
                            Due to the perishable nature of our products, <strong>all sales are final and non-refundable</strong> once payment has been successfully processed. We prepare every bowl fresh specifically for your order, which means we cannot accept returns or issue refunds.
                        </p>
                        <p>
                            By placing an order and completing payment on Pro.tein.bites, you acknowledge and agree to this no-refund policy.
                        </p>
                    </Section>

                    <Section title="2. Quality Issues">
                        <p>
                            We take our food quality very seriously. If you receive an order that has a genuine quality issue (e.g., spoiled ingredients, wrong items, tampered packaging), please contact us <strong>within 2 hours of delivery</strong> with:
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>Your order ID</li>
                            <li>Photos of the issue</li>
                            <li>A brief description of the problem</li>
                        </ul>
                        <p>
                            We will review your complaint and, at our sole discretion, may offer a <strong>redelivery</strong> or <strong>store credit</strong> for your next order. Monetary refunds will <strong>not</strong> be provided.
                        </p>
                    </Section>

                    <Section title="3. Non-Delivery">
                        <p>
                            If your order is not delivered during the selected time slot, please refer to our <Link to="/shipping" className="text-[#d4912a] font-semibold hover:underline">Shipping Policy</Link> for our missed delivery guarantee. We will make every effort to deliver your order in the next available slot or the following day.
                        </p>
                        <p>
                            If your order is ultimately not delivered at all due to our error, we will issue a <strong>full store credit</strong> for the order amount, applicable to your next purchase.
                        </p>
                    </Section>

                    <Section title="4. Cancellations">
                        <p>
                            Once an order has been placed and payment is confirmed, it <strong>cannot be cancelled</strong> by the customer. This is because our kitchen begins preparation based on confirmed orders to ensure next-day freshness.
                        </p>
                        <p>
                            In exceptional circumstances, Pro.tein.bites reserves the right to cancel an order (e.g., product unavailability, force majeure). In such cases, a <strong>full store credit</strong> will be issued.
                        </p>
                    </Section>

                    <Section title="5. Payment Disputes">
                        <p>
                            If you believe a payment was charged in error or you did not authorize a transaction, please contact us immediately at the email below. We will work with Razorpay to investigate and resolve the issue.
                        </p>
                        <p>
                            Filing a chargeback or payment dispute without first contacting Pro.tein.bites may result in your account being suspended.
                        </p>
                    </Section>

                    <Section title="6. Contact Us">
                        <p>
                            For any questions about this refund policy or to report a quality issue, contact us:
                        </p>
                        <ul className="list-none space-y-1 ml-2">
                            <li>📧 Feedback / Quality Issues: <a href="mailto:proteinbites.feedback@gmail.com" className="text-[#d4912a] font-semibold hover:underline">proteinbites.feedback@gmail.com</a></li>
                            <li>📧 General Queries: <a href="mailto:proteinbites.query@gmail.com" className="text-[#d4912a] font-semibold hover:underline">proteinbites.query@gmail.com</a></li>
                            <li>📸 Instagram: <a href="https://www.instagram.com/pro.tein.bites/" target="_blank" rel="noopener noreferrer" className="text-[#d4912a] font-semibold hover:underline">@pro.tein.bites</a></li>
                        </ul>
                    </Section>

                    {/* Back link */}
                    <FadeIn>
                        <div className="pt-6 border-t border-gray-100">
                            <Link to="/" className="text-sm font-bold text-[#d4912a] hover:underline">
                                &larr; Back to Home
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
};

export default RefundPolicyPage;
