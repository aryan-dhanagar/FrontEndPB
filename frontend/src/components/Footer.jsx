import { Link } from 'react-router-dom';

const Footer = () => {

    return (
        <footer id="footer" className="bg-[#b9e3b1]">
            {/* Top Section: Links Grid + Newsletter */}
            <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-12">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
                    {/* SHOP */}
                    <div>
                        <h4 className="font-sans font-bold text-[#1a1a1a] text-sm uppercase tracking-wider mb-5">
                            Shop
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-sm text-[#4a4a4a] hover:text-[#1a1a1a] transition-colors duration-300">
                                    Protein Bowls
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-[#4a4a4a] hover:text-[#1a1a1a] transition-colors duration-300">
                                    Bestsellers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-[#4a4a4a] hover:text-[#1a1a1a] transition-colors duration-300">
                                    Salads
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* POLICIES */}
                    <div>
                        <h4 className="font-sans font-bold text-[#1a1a1a] text-sm uppercase tracking-wider mb-5">
                            Policies
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/terms" className="text-sm text-[#4a4a4a] hover:text-[#1a1a1a] transition-colors duration-300">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="text-sm text-[#4a4a4a] hover:text-[#1a1a1a] transition-colors duration-300">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/shipping" className="text-sm text-[#4a4a4a] hover:text-[#1a1a1a] transition-colors duration-300">
                                    Shipping Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/refund" className="text-sm text-[#4a4a4a] hover:text-[#1a1a1a] transition-colors duration-300">
                                    Refund Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* QUICK LINKS */}
                    <div>
                        <h4 className="font-sans font-bold text-[#1a1a1a] text-sm uppercase tracking-wider mb-5">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/about" className="text-sm text-[#4a4a4a] hover:text-[#1a1a1a] transition-colors duration-300">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <a href="/orders" className="text-sm text-[#4a4a4a] hover:text-[#1a1a1a] transition-colors duration-300">
                                    Track my Order
                                </a>
                            </li>
                            <li>
                                <Link to="/contact" className="text-sm text-[#4a4a4a] hover:text-[#1a1a1a] transition-colors duration-300">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* THE DEVELOPERS */}
                    <div>
                        <h4 className="font-sans font-bold text-[#1a1a1a] text-sm uppercase tracking-wider mb-5">
                            The Developers
                        </h4>
                        <div className="flex items-start gap-6">
                            <div>
                                <p className="text-sm font-semibold text-[#1a1a1a] leading-tight">Aryan Dhanagar</p>
                                <p className="text-[11px] text-[#8a8580]">Full Stack Developer</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-[#1a1a1a] leading-tight">Parikshit Desai</p>
                                <p className="text-[11px] text-[#8a8580]">Full Stack Developer</p>
                            </div>
                        </div>
                        <Link
                            to="/developers"
                            className="inline-block mt-4 text-xs font-bold text-[#1a1a1a] uppercase tracking-wider hover:text-[#d4912a] transition-colors duration-300"
                        >
                            Meet The Team →
                        </Link>
                    </div>
                </div>
            </div>

            {/* Giant Brand Name */}
            <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 pb-6 pt-4">
                <h2
                    className="font-sans font-black text-[#1a1a1a] uppercase leading-none select-none"
                    style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', letterSpacing: '-0.03em' }}
                >
                    PRO.TEIN.BITES
                </h2>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-[#d5d0c8]">
                <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 py-4 flex items-center justify-center">
                    {/* Copyright */}
                    <p className="text-xs text-[#8a8580] text-center">
                        © Copyright, Pro.tein.bites {new Date().getFullYear()} MADE WITH{' '}
                        <span className="text-red-500">❤</span> BY AD / PD
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
