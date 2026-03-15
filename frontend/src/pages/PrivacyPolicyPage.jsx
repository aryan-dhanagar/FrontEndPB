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

const PrivacyPolicyPage = () => {
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
                            Privacy Policy
                        </h1>
                        <p className="text-sm text-[#8a8580]">Last updated: 14 March 2026</p>
                    </FadeIn>
                </div>
            </section>

            {/* Content */}
            <section className="py-14 sm:py-20">
                <div className="max-w-[800px] mx-auto px-6 sm:px-8">
                    <Section title="1. Introduction">
                        <p>
                            Pro.tein.bites (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and place orders.
                        </p>
                        <p>
                            This policy is compliant with the Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, as applicable in India.
                        </p>
                    </Section>

                    <Section title="2. Information We Collect">
                        <p><strong>Personal Information you provide directly:</strong></p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li><strong>Name</strong>: to process and deliver your orders</li>
                            <li><strong>Email address</strong>: for account verification (OTP), order confirmation, and delivery updates</li>
                            <li><strong>Phone number</strong> (optional): for delivery coordination</li>
                            <li><strong>Delivery address</strong>: to deliver your orders</li>
                            <li><strong>Delivery area</strong>: to verify serviceability</li>
                        </ul>
                        <p><strong>Payment Information:</strong></p>
                        <p>
                            Payments are processed entirely by <strong>Razorpay</strong>, a PCI-DSS compliant payment gateway. We do <strong>not</strong> store your credit card, debit card, or bank account details on our servers. We only receive and store the Razorpay transaction ID and payment status for order tracking.
                        </p>
                        <p><strong>Automatically Collected Information:</strong></p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>Browser type and version</li>
                            <li>Pages visited and time spent on our Website</li>
                            <li>Referring website</li>
                            <li>Device information (screen size, OS)</li>
                        </ul>
                    </Section>

                    <Section title="3. How We Use Your Information">
                        <p>We use the information we collect to:</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>Process and fulfill your orders</li>
                            <li>Send order confirmations, delivery updates, and tracking information via email</li>
                            <li>Verify your identity through email OTP</li>
                            <li>Manage delivery scheduling and slot availability</li>
                            <li>Improve our Website, products, and customer experience</li>
                            <li>Respond to your inquiries and support requests</li>
                            <li>Prevent fraudulent transactions and ensure Website security</li>
                        </ul>
                    </Section>

                    <Section title="4. Data Sharing &amp; Disclosure">
                        <p>
                            We do <strong>NOT</strong> sell, trade, or rent your personal information to third parties for marketing purposes. We may share your data only in the following limited circumstances:
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li><strong>Razorpay</strong>: payment processing (governed by Razorpay&apos;s privacy policy)</li>
                            <li><strong>Email service providers</strong>: to send order confirmations and updates</li>
                            <li><strong>Legal requirements</strong>: if required by law, court order, or government authority</li>
                            <li><strong>Business protection</strong>: to enforce our Terms, protect our rights, or ensure safety</li>
                        </ul>
                    </Section>

                    <Section title="5. Cookies &amp; Local Storage">
                        <p>
                            Our Website uses <strong>local storage</strong> (browser storage) to maintain your shopping cart and session preferences. We may also use cookies for analytics purposes to understand how visitors use our Website.
                        </p>
                        <p>
                            You can disable cookies in your browser settings, but this may affect the functionality of certain features such as the shopping cart.
                        </p>
                    </Section>

                    <Section title="6. Data Retention">
                        <p>
                            We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy:
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li><strong>Order data</strong>: retained for up to 2 years for business records and dispute resolution</li>
                            <li><strong>Account data</strong> (email, name): retained as long as your account is active</li>
                            <li><strong>Payment references</strong>: retained as per applicable tax and financial regulations</li>
                        </ul>
                    </Section>

                    <Section title="7. Your Rights">
                        <p>Under applicable Indian law, you have the right to:</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li><strong>Access</strong>: request a copy of the personal data we hold about you</li>
                            <li><strong>Correction</strong>: request correction of inaccurate or incomplete data</li>
                            <li><strong>Deletion</strong>: request deletion of your personal data (subject to legal obligations)</li>
                            <li><strong>Withdrawal of consent</strong>: withdraw your consent for data processing at any time</li>
                        </ul>
                        <p>
                            To exercise any of these rights, please contact us at the email address provided below.
                        </p>
                    </Section>

                    <Section title="8. Data Security">
                        <p>
                            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>HTTPS encryption for all data transmission</li>
                            <li>Secure database storage with access controls</li>
                            <li>PCI-DSS compliant payment processing via Razorpay</li>
                            <li>Regular security reviews and updates</li>
                        </ul>
                        <p>
                            However, no method of transmission over the Internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
                        </p>
                    </Section>

                    <Section title="9. Children&apos;s Privacy">
                        <p>
                            Our Website is not intended for children under 18 years of age. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us and we will promptly delete it.
                        </p>
                    </Section>

                    <Section title="10. Changes to This Policy">
                        <p>
                            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated &quot;Last updated&quot; date. We encourage you to review this policy periodically.
                        </p>
                    </Section>

                    <Section title="11. Contact Us">
                        <p>
                            For any questions, concerns, or requests regarding your personal data or this Privacy Policy, please contact us:
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

export default PrivacyPolicyPage;
