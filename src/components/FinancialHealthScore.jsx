import { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';

export const FinancialHealthScore = () => {
    const { getFinancialHealth } = useContext(TransactionContext);
    const health = getFinancialHealth();

    const getStatusColor = (status) => {
        switch (status) {
            case 'excellent':
                return {
                    bg: 'from-green-500 to-emerald-600',
                    text: 'text-green-600 dark:text-green-400',
                    ring: 'ring-green-500/30',
                    label: 'Excellent',
                };
            case 'good':
                return {
                    bg: 'from-primary-500 to-primary-600',
                    text: 'text-primary-600 dark:text-primary-400',
                    ring: 'ring-primary-500/30',
                    label: 'Good',
                };
            case 'fair':
                return {
                    bg: 'from-yellow-500 to-amber-600',
                    text: 'text-yellow-600 dark:text-yellow-400',
                    ring: 'ring-yellow-500/30',
                    label: 'Fair',
                };
            case 'warning':
                return {
                    bg: 'from-orange-500 to-orange-600',
                    text: 'text-orange-600 dark:text-orange-400',
                    ring: 'ring-orange-500/30',
                    label: 'Warning',
                };
            case 'critical':
                return {
                    bg: 'from-red-500 to-red-600',
                    text: 'text-red-600 dark:text-red-400',
                    ring: 'ring-red-500/30',
                    label: 'Critical',
                };
            default:
                return {
                    bg: 'from-gray-500 to-gray-600',
                    text: 'text-gray-600 dark:text-gray-400',
                    ring: 'ring-gray-500/30',
                    label: 'Unknown',
                };
        }
    };

    const statusColors = getStatusColor(health.status);
    const circumference = 2 * Math.PI * 70; // radius = 70
    const strokeDashoffset = circumference - (health.score / 100) * circumference;

    return (
        <div className="glass-card p-6 rounded-2xl animate-fade-in transition-transform duration-300 hover:-translate-y-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white heading-glow mb-6">
                Financial Health Score
            </h3>

            <div className="flex flex-col items-center justify-center py-4">
                {/* Circular Progress */}
                <div className="relative w-48 h-48">
                    <svg className="transform -rotate-90 w-48 h-48">
                        {/* Background circle */}
                        <circle
                            cx="96"
                            cy="96"
                            r="70"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            className="text-gray-200 dark:text-gray-700"
                        />
                        {/* Progress circle */}
                        <circle
                            cx="96"
                            cy="96"
                            r="70"
                            stroke="url(#gradient)"
                            strokeWidth="12"
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-out"
                        />
                        {/* Gradient definition */}
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" className={statusColors.bg.includes('green') ? 'text-green-500' : statusColors.bg.includes('primary') ? 'text-primary-500' : statusColors.bg.includes('yellow') ? 'text-yellow-500' : statusColors.bg.includes('orange') ? 'text-orange-500' : 'text-red-500'} stopColor="currentColor" />
                                <stop offset="100%" className={statusColors.bg.includes('emerald') ? 'text-emerald-600' : statusColors.bg.includes('primary') ? 'text-primary-600' : statusColors.bg.includes('amber') ? 'text-amber-600' : statusColors.bg.includes('orange') ? 'text-orange-600' : 'text-red-600'} stopColor="currentColor" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Score text in center */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <p className={`text-5xl font-bold ${statusColors.text}`}>
                            {health.score}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            out of 100
                        </p>
                    </div>
                </div>

                {/* Status badge */}
                <div className={`mt-6 px-6 py-2.5 rounded-full bg-gradient-to-r ${statusColors.bg} shadow-lg`}>
                    <p className="text-white font-semibold text-sm">
                        {statusColors.label}
                    </p>
                </div>

                {/* Savings rate */}
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl w-full">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Savings Rate
                        </p>
                        <p className={`text-2xl font-bold ${statusColors.text}`}>
                            {health.savingsRate}%
                        </p>
                    </div>
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        {parseFloat(health.savingsRate) >= 30 && 'Outstanding! Keep up the excellent work.'}
                        {parseFloat(health.savingsRate) >= 20 && parseFloat(health.savingsRate) < 30 && 'Great job! You\'re saving well.'}
                        {parseFloat(health.savingsRate) >= 10 && parseFloat(health.savingsRate) < 20 && 'Good progress. Try to save a bit more.'}
                        {parseFloat(health.savingsRate) >= 0 && parseFloat(health.savingsRate) < 10 && 'Consider increasing your savings.'}
                        {parseFloat(health.savingsRate) < 0 && 'Warning: Spending exceeds income.'}
                    </div>
                </div>
            </div>
        </div>
    );
};
