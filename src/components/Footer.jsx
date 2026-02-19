import { Link } from 'react-router-dom';

// Icons as inline SVG for zero external dependencies
const GithubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577
    0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729
    1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93
    0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405
    1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23
    1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015
    3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
);

const LinkedinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85
    3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063
    1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0
    1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
);

const PortfolioIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
);

const navLinks = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Analytics', to: '/analytics' },
    { label: 'Budget', to: '/budget' },
    { label: 'Profile', to: '/profile' },
];

const socialLinks = [
    {
        label: 'GitHub',
        href: 'https://github.com/Sourav-1210',
        icon: <GithubIcon />,
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/sourav1210/',
        icon: <LinkedinIcon />,
    },
    {
        label: 'Portfolio',
        href: 'https://sourav-1210.github.io',
        icon: <PortfolioIcon />,
    },
];

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full mt-auto border-t border-gray-200 dark:border-white/[0.06] bg-white/80 dark:bg-[#0B0F19]/90 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Main grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

                    {/* ── Brand Section ── */}
                    <div className="flex flex-col gap-3">
                        {/* Logo mark + name */}
                        <div className="flex items-center gap-2">
                            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-glow-green">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                    fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="1" x2="12" y2="23" />
                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                </svg>
                            </span>
                            <span className="text-lg font-bold text-gradient heading-glow">
                                Finance Tracker
                            </span>
                        </div>

                        <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 max-w-xs">
                            A clean, modern fintech dashboard to track income, expenses, and financial goals — all in one place.
                        </p>

                        {/* Small accent divider */}
                        <div className="w-10 h-0.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 mt-1" />
                    </div>

                    {/* ── Navigation Links ── */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                            Navigation
                        </h3>
                        <ul className="flex flex-col gap-2">
                            {navLinks.map(({ label, to }) => (
                                <li key={to}>
                                    <Link
                                        to={to}
                                        className="group inline-flex items-center gap-2 text-sm font-medium
                               text-gray-600 dark:text-gray-400
                               hover:text-green-600 dark:hover:text-green-400
                               transition-colors duration-200"
                                    >
                                        {/* Animated arrow indicator */}
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Social Links ── */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                            Connect
                        </h3>
                        <ul className="flex flex-col gap-2">
                            {socialLinks.map(({ label, href, icon }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="group inline-flex items-center gap-2.5 text-sm font-medium
                               text-gray-600 dark:text-gray-400
                               hover:text-green-600 dark:hover:text-green-400
                               transition-colors duration-200"
                                    >
                                        <span className="flex items-center justify-center w-7 h-7 rounded-lg
                                     bg-gray-100 dark:bg-white/[0.05]
                                     group-hover:bg-green-500/10 dark:group-hover:bg-green-500/20
                                     text-gray-500 dark:text-gray-400
                                     group-hover:text-green-600 dark:group-hover:text-green-400
                                     transition-all duration-200">
                                            {icon}
                                        </span>
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* ── Bottom bar ── */}
                <div className="mt-10 pt-6 border-t border-gray-100 dark:border-white/[0.05]
                        flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-gray-400 dark:text-gray-500 text-center sm:text-left">
                        © {year}&nbsp;
                        <span className="font-semibold text-gray-600 dark:text-gray-400">Sourav&#8209;1210</span>
                        &nbsp;—&nbsp;Personal Finance Tracker
                    </p>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                           bg-green-50 dark:bg-green-500/10
                           text-xs font-medium text-green-700 dark:text-green-400
                           border border-green-200 dark:border-green-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Live
                    </span>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
