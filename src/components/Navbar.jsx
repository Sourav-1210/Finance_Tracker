import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { logOut } from '../firebase/auth';
import { AiFillDollarCircle } from 'react-icons/ai';
import { HiMoon, HiSun, HiChevronDown } from 'react-icons/hi';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { MdDashboard, MdReceipt, MdAnalytics, MdAccountBalanceWallet } from 'react-icons/md';

export const Navbar = () => {
    const { user } = useAuth();
    const { isDark, toggleTheme } = useContext(ThemeContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const location = useLocation();

    const handleLogout = async () => {
        await logOut();
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-50 bg-white/95 dark:bg-[#0B0F19]/90 border-b border-gray-200 dark:border-white/5 shadow-sm backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/dashboard" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                        <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                            <AiFillDollarCircle className="text-white text-2xl" />
                        </div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
                            FinanceTracker
                        </span>
                    </Link>

                    <div className="flex items-center gap-6">
                        <Link
                            to="/dashboard"
                            className={`nav-link hover-lift-sm flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${isActive('/dashboard')
                                ? 'nav-link-active bg-primary-500 text-white shadow-glow-green'
                                : 'text-gray-700 dark:text-slate-100 hover:bg-primary-500/10'
                                }`}
                        >
                            <MdDashboard className="text-lg" />
                            <span className="hidden sm:inline font-medium">Dashboard</span>
                        </Link>

                        <Link
                            to="/transactions"
                            className={`nav-link hover-lift-sm flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${isActive('/transactions')
                                ? 'nav-link-active bg-primary-500 text-white shadow-glow-green'
                                : 'text-gray-700 dark:text-slate-100 hover:bg-primary-500/10'
                                }`}
                        >
                            <MdReceipt className="text-lg" />
                            <span className="hidden sm:inline font-medium">Transactions</span>
                        </Link>

                        <Link
                            to="/analytics"
                            className={`nav-link hover-lift-sm flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${isActive('/analytics')
                                ? 'nav-link-active bg-primary-500 text-white shadow-glow-green'
                                : 'text-gray-700 dark:text-slate-100 hover:bg-primary-500/10'
                                }`}
                        >
                            <MdAnalytics className="text-lg" />
                            <span className="hidden sm:inline font-medium">Analytics</span>
                        </Link>

                        <Link
                            to="/budget"
                            className={`nav-link hover-lift-sm flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${isActive('/budget')
                                ? 'nav-link-active bg-primary-500 text-white shadow-glow-green'
                                : 'text-gray-700 dark:text-slate-100 hover:bg-primary-500/10'
                                }`}
                        >
                            <MdAccountBalanceWallet className="text-lg" />
                            <span className="hidden sm:inline font-medium">Budget</span>
                        </Link>

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

                        {user && (
                            <div className="relative">
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
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-lg font-bold shadow-glow-green">
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
                                            <Link
                                                to="/dashboard"
                                                onClick={() => setShowDropdown(false)}
                                                className="profile-dropdown-item text-left text-gray-700 dark:text-slate-100"
                                            >
                                                <MdDashboard className="profile-dropdown-item-icon text-lg" />
                                                <span>Dashboard</span>
                                            </Link>
                                            <Link
                                                to="/transactions"
                                                onClick={() => setShowDropdown(false)}
                                                className="profile-dropdown-item text-left text-gray-700 dark:text-slate-100"
                                            >
                                                <MdReceipt className="profile-dropdown-item-icon text-lg" />
                                                <span>Transactions</span>
                                            </Link>
                                            <Link
                                                to="/analytics"
                                                onClick={() => setShowDropdown(false)}
                                                className="profile-dropdown-item text-left text-gray-700 dark:text-slate-100"
                                            >
                                                <MdAnalytics className="profile-dropdown-item-icon text-lg" />
                                                <span>Analytics</span>
                                            </Link>
                                            <Link
                                                to="/budget"
                                                onClick={() => setShowDropdown(false)}
                                                className="profile-dropdown-item text-left text-gray-700 dark:text-slate-100"
                                            >
                                                <MdAccountBalanceWallet className="profile-dropdown-item-icon text-lg" />
                                                <span>Budget</span>
                                            </Link>
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
                    </div>
                </div>
            </div>
        </nav>
    );
};
