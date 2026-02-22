import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { logOut } from '../firebase/auth';
import { AiFillDollarCircle } from 'react-icons/ai';
import { HiMoon, HiSun, HiChevronDown, HiMenu, HiX } from 'react-icons/hi';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { MdDashboard, MdReceipt, MdAnalytics, MdAccountBalanceWallet } from 'react-icons/md';

export const Navbar = () => {
    const { user } = useAuth();
    const { isDark, toggleTheme } = useContext(ThemeContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const handleLogout = async () => {
        await logOut();
    };

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { to: '/dashboard', label: 'Dashboard', icon: <MdDashboard className="text-lg" /> },
        { to: '/transactions', label: 'Transactions', icon: <MdReceipt className="text-lg" /> },
        { to: '/analytics', label: 'Analytics', icon: <MdAnalytics className="text-lg" /> },
        { to: '/budget', label: 'Budget', icon: <MdAccountBalanceWallet className="text-lg" /> },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/95 dark:bg-[#0B0F19]/90 border-b border-gray-200 dark:border-white/5 shadow-sm backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/dashboard" className="flex items-center gap-3 hover:opacity-90 transition-opacity shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                            <AiFillDollarCircle className="text-white text-2xl" />
                        </div>
                        <span className="text-xl font-bold hidden sm:flex overflow-hidden">
                            {'FinanceTracker'.split('').map((char, i) => (
                                <span
                                    key={i}
                                    className="brand-letter"
                                    style={{ animationDelay: `${i * 0.06}s` }}
                                >
                                    {char}
                                </span>
                            ))}
                        </span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map(({ to, label, icon }) => (
                            <Link
                                key={to}
                                to={to}
                                className={`nav-link hover-lift-sm flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${isActive(to)
                                    ? 'nav-link-active bg-primary-500 text-white shadow-glow-green'
                                    : 'text-gray-700 dark:text-slate-100 hover:bg-primary-500/10'
                                    }`}
                            >
                                {icon}
                                <span className="font-medium text-sm">{label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Right side controls */}
                    <div className="flex items-center gap-2">
                        {/* Theme toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-lg bg-gray-100/90 dark:bg-[#121826] border border-transparent dark:border-white/10 hover:bg-gray-200 dark:hover:bg-[#1f2937] shadow-sm dark:shadow-glass transition-all duration-200"
                            aria-label="Toggle theme"
                        >
                            {isDark ? (
                                <HiSun className="text-xl text-amber-400" />
                            ) : (
                                <HiMoon className="text-xl text-indigo-600" />
                            )}
                        </button>

                        {/* Profile Dropdown (desktop) */}
                        {user && (
                            <div className="relative hidden md:block">
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-200"
                                >
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold shadow-glow-green">
                                        {user.email?.[0].toUpperCase()}
                                    </div>
                                    <HiChevronDown className={`text-gray-600 dark:text-slate-200 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
                                </button>

                                {showDropdown && (
                                    <div className="absolute right-0 mt-3 w-72 z-50 profile-dropdown overflow-hidden transform origin-top-right animate-slide-down">
                                        <div className="p-4 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-white/5 dark:to-white/0 border-b border-gray-200 dark:border-white/10">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white text-lg font-bold shadow-glow-green">
                                                    {user.email?.[0].toUpperCase()}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="profile-dropdown-header-name text-gray-900 truncate text-sm">
                                                        {user.displayName || 'User'}
                                                    </p>
                                                    <p className="profile-dropdown-header-email text-gray-600 truncate">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-2 bg-white/60 dark:bg-transparent space-y-1.5">
                                            <Link
                                                to="/profile"
                                                onClick={() => setShowDropdown(false)}
                                                className="profile-dropdown-item text-left text-gray-700 dark:text-slate-100"
                                            >
                                                <FiUser className="profile-dropdown-item-icon text-lg" />
                                                <span>My Profile</span>
                                            </Link>
                                            {navItems.map(({ to, label, icon }) => (
                                                <Link
                                                    key={to}
                                                    to={to}
                                                    onClick={() => setShowDropdown(false)}
                                                    className="profile-dropdown-item text-left text-gray-700 dark:text-slate-100"
                                                >
                                                    <span className="profile-dropdown-item-icon text-lg">{icon}</span>
                                                    <span>{label}</span>
                                                </Link>
                                            ))}
                                        </div>

                                        <div className="p-2 border-t border-gray-200/80 dark:border-white/10 bg-white/70 dark:bg-white/0">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors duration-150 font-medium"
                                            >
                                                <FiLogOut className="text-lg" />
                                                <span>Sign out</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Hamburger (mobile only) */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2.5 rounded-lg bg-gray-100/90 dark:bg-[#121826] border border-transparent dark:border-white/10 hover:bg-gray-200 dark:hover:bg-[#1f2937] transition-all duration-200"
                            aria-label="Toggle mobile menu"
                        >
                            {mobileMenuOpen ? (
                                <HiX className="text-xl text-gray-700 dark:text-white" />
                            ) : (
                                <HiMenu className="text-xl text-gray-700 dark:text-white" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-gray-200 dark:border-white/10 bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-xl animate-slide-down">
                    <div className="px-4 py-3 space-y-1">
                        {navItems.map(({ to, label, icon }) => (
                            <Link
                                key={to}
                                to={to}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${isActive(to)
                                    ? 'bg-primary-500 text-white shadow-glow-green'
                                    : 'text-gray-700 dark:text-slate-100 hover:bg-primary-500/10'
                                    }`}
                            >
                                {icon}
                                <span>{label}</span>
                            </Link>
                        ))}

                        {/* Profile link in mobile */}
                        {user && (
                            <Link
                                to="/profile"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 dark:text-slate-100 hover:bg-primary-500/10 transition-all duration-200"
                            >
                                <FiUser className="text-lg" />
                                <span>My Profile</span>
                            </Link>
                        )}

                        <div className="pt-2 border-t border-gray-200 dark:border-white/10 mt-2">
                            {user && (
                                <div className="flex items-center gap-3 px-4 py-3 mb-1">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-sm">
                                        {user.email?.[0].toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user.displayName || 'User'}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                                    </div>
                                </div>
                            )}
                            <button
                                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150 font-medium"
                            >
                                <FiLogOut className="text-lg" />
                                <span>Sign out</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};
