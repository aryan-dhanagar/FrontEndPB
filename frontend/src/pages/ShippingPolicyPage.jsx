import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getSettings } from '../services/api';

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

// Format 24h hour to readable string
const formatHour = (h) => {
    if (h === 0) return '12 AM';
    if (h === 12) return '12 PM';
    return h > 12 ? `${h - 12} PM` : `${h} AM`;
};

const ShippingPolicyPage = () => {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        getSettings().then(setSettings).catch(() => {});
    }, []);

    const slots = settings?.deliverySlots || [];
    const areas = settings?.serviceableAreas || [];
    const maxItems = settings?.maxItemsPerCustomerPerDay || 15;
    const orderStart = settings?.orderingHoursStart;
    const orderEnd = settings?.orderingHoursEnd;

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
                            Shipping &amp; Delivery
                        </h1>
                        <p className="text-sm text-[#8a8580]">Last updated: 14 March 2026</p>
                    </FadeIn>
                </div>
            </section>

            {/* Content */}
            <section className="py-14 sm:py-20">
                <div className="max-w-[800px] mx-auto px-6 sm:px-8">

                    {/* Quick overview card */}
                    <FadeIn>
                        <div className="bg-[#fdf8f0] border border-[#e8e3dc] rounded-2xl p-6 sm:p-8 mb-12">
                            <h2 className="font-bold text-lg text-[#1a1a1a] mb-4">⚡ Quick Overview</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                <div className="bg-white rounded-xl p-4 border border-[#e8e3dc]">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#8a8580] mb-1">Delivery Slots</p>
                                    <p className="font-bold text-[#1a1a1a]">
                                        {slots.length > 0 ? slots.map(s => s.label).join(', ') : 'As per admin configuration'}
                                    </p>
                                </div>
                                <div className="bg-white rounded-xl p-4 border border-[#e8e3dc]">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#8a8580] mb-1">Delivery</p>
                                    <p className="font-bold text-[#1a1a1a]">Next Day</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 border border-[#e8e3dc]">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#8a8580] mb-1">Serviceable Areas</p>
                                    <p className="font-bold text-[#1a1a1a]">
                                        {areas.length > 0 ? areas.join(', ') : 'Check at checkout'}
                                    </p>
                                </div>
                                <div className="bg-white rounded-xl p-4 border border-[#e8e3dc]">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#8a8580] mb-1">Item Limit</p>
                                    <p className="font-bold text-[#1a1a1a]">{maxItems} items / day / customer</p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    <Section title="1. How Ordering Works">
                        <p>
                            At Pro.tein.bites, we prepare every bowl fresh. To ensure maximum freshness, our ordering system works on a <strong>next-day delivery</strong> model:
                        </p>
                        <ol className="list-decimal list-inside space-y-2 ml-2">
                            <li><strong>Place your order</strong> through our website during the available ordering window.</li>
                            <li><strong>Select a delivery slot</strong> for tomorrow — choose from the available time slots shown at checkout.</li>
                            <li><strong>Receive your order tomorrow</strong> during the selected slot at your delivery address.</li>
                        </ol>
                        {orderStart != null && orderEnd != null && (
                            <p className="text-sm text-[#8a8580] mt-2">
                                * Current ordering window: <strong>{formatHour(orderStart)}</strong> to <strong>{formatHour(orderEnd)}</strong> IST. This may change — the latest hours are always enforced at checkout.
                            </p>
                        )}
                    </Section>

                    <Section title="2. Delivery Slots">
                        <p>
                            We offer delivery slots to fit your schedule. The available slots and their timings are configured by our team and may change at any time.
                        </p>
                        {slots.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                                {slots.map((slot, i) => (
                                    <div key={i} className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                                        <p className="font-bold text-[#1a1a1a] text-sm">{slot.label}</p>
                                        {slot.startTime && slot.endTime && (
                                            <p className="text-xs text-[#8a8580] mt-0.5">{slot.startTime} – {slot.endTime}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                        <p className="text-sm text-[#8a8580] mt-2">
                            * Delivery slots and their timings may be updated at any time. The latest available slots are always shown at checkout.
                        </p>
                        <p>
                            Each slot has a maximum capacity. Slots are allocated on a <strong>first-come, first-served</strong> basis. If your preferred slot is fully booked, you will need to select an alternative.
                        </p>
                    </Section>

                    <Section title="3. Serviceable Areas">
                        <p>
                            We currently deliver to select areas in Mumbai. Our delivery zones are regularly updated.
                        </p>
                        {areas.length > 0 && (
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                {areas.map((area, i) => (
                                    <li key={i}><strong>{area}</strong></li>
                                ))}
                            </ul>
                        )}
                        <p>
                            We are actively expanding our delivery zones. If your area is not listed, please reach out to us — we&apos;d love to know where our customers are!
                        </p>
                    </Section>

                    <Section title="4. Delivery Fee">
                        <p>
                            Delivery fees may vary based on your delivery area and order value. Any applicable delivery charges will be clearly displayed at checkout before you complete your order.
                        </p>
                    </Section>

                    <Section title="5. Per-Customer Limits">
                        <p>
                            To ensure fair access for all customers and maintain product quality, each customer may order a maximum of <strong>{maxItems} items per day</strong>. This includes all items across multiple orders for the same delivery date. This limit may change based on demand.
                        </p>
                    </Section>

                    <Section title="6. Missed Delivery Guarantee">
                        <p>
                            We take our delivery commitments seriously. If your order is <strong>not delivered during your chosen slot</strong>, we will make every effort to deliver it in the <strong>next available slot</strong> on the same day. If that is not possible, your order will be delivered the <strong>following day</strong>.
                        </p>
                        <p>
                            If there is any issue with your delivery, please contact us immediately so we can resolve it promptly.
                        </p>
                    </Section>

                    <Section title="7. Order Tracking">
                        <p>
                            Once your order is placed, you will receive an order confirmation with a tracking link via email. You can track the status of your order (Placed → Confirmed → Preparing → Out for Delivery → Delivered) at any time through the tracking page.
                        </p>
                    </Section>

                    <Section title="8. Contact Us">
                        <p>
                            For any questions about shipping or delivery, reach out to us:
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

export default ShippingPolicyPage;
