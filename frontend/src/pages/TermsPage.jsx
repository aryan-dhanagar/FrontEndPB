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

const TermsPage = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="bg-[#f5f0ea] py-16 sm:py-24">
                <div className="max-w-[800px] mx-auto px-6 sm:px-8">
                    <FadeIn>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8a8580] mb-3">Legal</p>
                        <h1
                            className="font-sans font-black text-[#1a1a1a] uppercase leading-[0.95] mb-4"
                            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.03em' }}
                        >
                            Terms &amp; Conditions
                        </h1>
                        <p className="text-sm text-[#8a8580]">Last updated: 14 March 2026</p>
                    </FadeIn>
                </div>
            </section>

            {/* Content */}
            <section className="py-14 sm:py-20">
                <div className="max-w-[800px] mx-auto px-6 sm:px-8">
                    <Section title="1. Acceptance of Terms">
                        <p>
                            By accessing or using the Pro.tein.bites website (the &quot;Website&quot;) and placing orders through it, you agree to be bound by these Terms &amp; Conditions (&quot;Terms&quot;). If you do not agree, please do not use the Website.
                        </p>
                        <p>
                            Pro.tein.bites reserves the right to update these Terms at any time. Continued use of the Website after changes constitutes acceptance of the revised Terms.
                        </p>
                    </Section>

                    <Section title="2. Account &amp; Email Verification">
                        <p>
                            To place an order, you must verify your email address via our one-time password (OTP) system. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                        </p>
                        <p>
                            You agree to provide accurate, current, and complete information during the verification process.
                        </p>
                    </Section>

                    <Section title="3. Orders &amp; Delivery">
                        <p>
                            All orders placed today are scheduled for <strong>next-day delivery</strong> in the delivery slot you select at checkout.
                        </p>
                        <p>
                            Available delivery slots (Morning, Lunch) are subject to capacity limits. Once a slot is fully booked, it becomes unavailable. We currently deliver to select areas in Mumbai; serviceable areas are displayed at checkout.
                        </p>
                        <p>
                            A per-customer daily item limit applies to ensure fair access for all customers. The current limit and available areas may change; always check the latest values during checkout.
                        </p>
                    </Section>

                    <Section title="4. Pricing &amp; Payments">
                        <p>
                            All prices are listed in Indian Rupees (₹) and include applicable taxes unless stated otherwise. Prices are subject to change without prior notice.
                        </p>
                        <p>
                            Payments are processed securely via <strong>Razorpay</strong>. By completing a payment, you agree to Razorpay&apos;s terms of service. Pro.tein.bites does not store your credit/debit card details.
                        </p>
                        <p>
                            All sales are final. Please refer to our <Link to="/refund" className="text-[#d4912a] font-semibold hover:underline">Refund Policy</Link> for details.
                        </p>
                    </Section>

                    <Section title="5. Intellectual Property &amp; Copyright">
                        <p>
                            All content on this Website, including but not limited to text, graphics, logos, images, photographs, recipes, product descriptions, UI design, and software code, is the exclusive property of Pro.tein.bites and its founders, and is protected under the Indian Copyright Act, 1957 and international copyright laws.
                        </p>
                        <p>
                            <strong>You may NOT:</strong>
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>Copy, reproduce, distribute, or republish any content from this Website</li>
                            <li>Use automated tools (scrapers, bots) to extract content or data</li>
                            <li>Modify, adapt, or create derivative works based on our content</li>
                            <li>Use our brand name, logos, or trademarks without written permission</li>
                            <li>Frame, mirror, or embed any part of this Website on third-party sites</li>
                        </ul>
                        <p>
                            Violations of our intellectual property rights will be pursued to the fullest extent of the law, including but not limited to DMCA takedown requests, cease-and-desist notices, and civil/criminal proceedings under the Indian Copyright Act and Information Technology Act, 2000.
                        </p>
                        <p className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm">
                            <strong>© {new Date().getFullYear()} Pro.tein.bites.</strong> All rights reserved. Unauthorized reproduction or distribution of any material on this Website is strictly prohibited and may result in legal action.
                        </p>
                    </Section>

                    <Section title="6. User Conduct">
                        <p>You agree not to:</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>Use the Website for any unlawful purpose</li>
                            <li>Attempt to gain unauthorized access to any part of the Website</li>
                            <li>Interfere with the Website&apos;s operation or security</li>
                            <li>Submit false or misleading information during ordering</li>
                            <li>Place fraudulent orders or use stolen payment methods</li>
                        </ul>
                    </Section>

                    <Section title="7. Limitation of Liability">
                        <p>
                            Pro.tein.bites provides the Website and services on an &quot;as is&quot; and &quot;as available&quot; basis. We make no warranties, express or implied, regarding the Website&apos;s availability, accuracy, or fitness for a particular purpose.
                        </p>
                        <p>
                            To the maximum extent permitted by Indian law, Pro.tein.bites shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Website or consumption of our products.
                        </p>
                        <p>
                            Our total liability for any claim shall not exceed the amount you paid for the specific order giving rise to the claim.
                        </p>
                    </Section>

                    <Section title="8. Third-Party Services">
                        <p>
                            Our Website may integrate with third-party services such as Razorpay (payments), email delivery services, and analytics tools. We are not responsible for the practices, content, or availability of these third-party services. Your use of such services is subject to their respective terms and privacy policies.
                        </p>
                    </Section>

                    <Section title="9. Governing Law &amp; Jurisdiction">
                        <p>
                            These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or your use of the Website shall be subject to the exclusive jurisdiction of the courts in <strong>Mumbai, Maharashtra, India</strong>.
                        </p>
                    </Section>

                    <Section title="10. Contact Us">
                        <p>
                            If you have any questions about these Terms, please contact us:
                        </p>
                        <ul className="list-none space-y-1 ml-2">
                            <li>📧 Email: <a href="mailto:proteinbites.query@gmail.com" className="text-[#d4912a] font-semibold hover:underline">proteinbites.query@gmail.com</a></li>
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

export default TermsPage;
