import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { cartCount } = useCart();
    const { isLoggedIn, user, openLogin, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false);

    const scrollTo = (id) => {
        setMenuOpen(false);
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        } else {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
                <div className="w-full px-4 flex items-center justify-between h-[90px]">
                    {/* Left: Hamburger + Search */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-navy-900 hover:text-navy-700 transition-colors duration-300"
                            aria-label="Menu"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                            </svg>
                        </button>
                    </div>

                    {/* Center: Logo */}
                    <Link to="/" className="absolute left-1/2 -translate-x-1/2 text-center">
                        <h1 className="font-logo text-2xl sm:text-[26px] text-navy-900 leading-none tracking-tight">
                            pro.tein.bites
                        </h1>
                        <p className="text-[9px] sm:text-[10px] font-sans font-medium tracking-[0.2em] text-gray-500 uppercase mt-0.5">
                            Premium Nutrition
                        </p>
                    </Link>

                    {/* Right: User, Cart */}
                    <div className="flex items-center gap-4">
                        {/* User icon / dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    if (isLoggedIn) {
                                        setShowUserMenu(!showUserMenu);
                                    } else {
                                        openLogin('login');
                                    }
                                }}
                                className={`transition-colors duration-300 ${isLoggedIn ? 'text-[#d4912a]' : 'text-navy-900 hover:text-navy-700'}`}
                                aria-label="Account"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill={isLoggedIn ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                            </button>

                            {/* User dropdown */}
                            {showUserMenu && isLoggedIn && (
                                <div
                                    className="absolute right-0 top-10 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50"
                                    onMouseLeave={() => setShowUserMenu(false)}
                                >
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-sm font-bold text-[#1a1a1a] truncate">{user?.name || 'User'}</p>
                                        <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                                    </div>
                                    <Link
                                        to="/orders"
                                        onClick={() => setShowUserMenu(false)}
                                        className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#1a1a1a] transition-colors"
                                    >
                                        📋 My Orders
                                    </Link>
                                    <button
                                        onClick={() => { logout(); setShowUserMenu(false); }}
                                        className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                                    >
                                        🚪 Sign Out
                                    </button>
                                </div>
                            )}
                        </div>

                        <Link to="/cart" className="relative text-navy-900 hover:text-navy-700 transition-colors duration-300" aria-label="Cart">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </header>

            {/* Slide-out Menu */}
            {menuOpen && (
                <div className="fixed inset-0 z-[60]" onClick={() => setMenuOpen(false)}>
                    <div className="absolute inset-0 bg-black/20" />
                    <nav
                        className="absolute left-0 top-0 h-full w-72 bg-white shadow-lg p-8 pt-20"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="absolute top-6 right-6 text-navy-900"
                            aria-label="Close menu"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <ul className="space-y-6">
                            <li>
                                <button onClick={() => scrollTo('hero')} className="text-lg font-medium text-navy-900 hover:text-olive-600 transition-colors duration-300">
                                    Home
                                </button>
                            </li>
                            <li>
                                <button onClick={() => scrollTo('signature-selection')} className="text-lg font-medium text-navy-900 hover:text-olive-600 transition-colors duration-300">
                                    Our Products
                                </button>
                            </li>
                            <li>
                                <Link to="/cart" onClick={() => setMenuOpen(false)} className="text-lg font-medium text-navy-900 hover:text-olive-600 transition-colors duration-300">
                                    Cart
                                </Link>
                            </li>
                            <li>
                                <Link to="/orders" onClick={() => setMenuOpen(false)} className="text-lg font-medium text-navy-900 hover:text-olive-600 transition-colors duration-300">
                                    My Orders
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" onClick={() => setMenuOpen(false)} className="text-lg font-medium text-navy-900 hover:text-olive-600 transition-colors duration-300">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link to="/developers" onClick={() => setMenuOpen(false)} className="text-lg font-medium text-navy-900 hover:text-olive-600 transition-colors duration-300">
                                    Developers
                                </Link>
                            </li>
                        </ul>

                        {/* Auth section in menu */}
                        <div className="mt-10 pt-6 border-t border-gray-100">
                            {isLoggedIn ? (
                                <div>
                                    <p className="text-sm font-bold text-[#1a1a1a] truncate">{user?.name || user?.email}</p>
                                    <button
                                        onClick={() => { logout(); setMenuOpen(false); }}
                                        className="mt-3 text-sm text-red-500 hover:underline"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => { openLogin('login'); setMenuOpen(false); }}
                                    className="w-full bg-[#1a1a1a] text-white font-bold text-sm uppercase tracking-wider py-3 rounded-xl hover:bg-[#333] transition-colors"
                                >
                                    Sign In
                                </button>
                            )}
                        </div>
                    </nav>
                </div>
            )}
        </>
    );
};

export default Header;
