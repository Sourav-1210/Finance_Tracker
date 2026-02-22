import { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';

export const FinancialHealthScore = () => {
    const { getFinancialHealth } = useContext(TransactionContext);
    const health = getFinancialHealth();

    const getStatusConfig = (status) => {
        switch (status) {
            case 'excellent':
                return { color: '#10b981', label: 'Excellent', textClass: 'text-green-500' };
            case 'good':
                return { color: '#3b82f6', label: 'Good', textClass: 'text-blue-500' };
            case 'fair':
                return { color: '#f59e0b', label: 'Fair', textClass: 'text-yellow-500' };
            case 'warning':
                return { color: '#f97316', label: 'Warning', textClass: 'text-orange-500' };
            case 'critical':
                return { color: '#ef4444', label: 'Critical', textClass: 'text-red-500' };
            default:
                return { color: '#6b7280', label: 'Unknown', textClass: 'text-gray-500' };
        }
    };

    const cfg = getStatusConfig(health.status);
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (health.score / 100) * circumference;

    return (
        <div className="glass-card p-6 rounded-2xl animate-fade-in transition-transform duration-300 hover:-translate-y-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white heading-glow mb-4">
                Financial Health
            </h3>

            <div className="flex flex-col items-center justify-center py-2">
                {/* Ring chart */}
                <div className="relative w-44 h-44">
                    <svg className="transform -rotate-90 w-44 h-44">
                        <circle
                            cx="88" cy="88" r={radius}
                            stroke="rgba(107, 114, 128, 0.2)"
                            strokeWidth="12"
                            fill="transparent"
                        />
                        <circle
                            cx="88" cy="88" r={radius}
                            stroke={cfg.color}
                            strokeWidth="12"
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-out"
                        />
                    </svg>

                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <p className={`text-4xl font-bold ${cfg.textClass}`}>
                            {health.score}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5 font-medium">
                            / 100
                        </p>
                    </div>
                </div>

                {/* Status label */}
                <div className="mt-4 px-5 py-1.5 rounded-full bg-gray-100 dark:bg-slate-800">
                    <p className={`font-semibold text-sm ${cfg.textClass}`}>
                        {cfg.label}
                    </p>
                </div>

                {/* Savings rate */}
                <div className="mt-5 p-4 bg-gray-50 dark:bg-slate-800/60 rounded-xl w-full border border-gray-100 dark:border-white/5">
                    <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                            Savings Rate
                        </p>
                        <p className={`text-xl font-bold ${cfg.textClass}`}>
                            {health.savingsRate}%
                        </p>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-slate-500 leading-relaxed">
                        {parseFloat(health.savingsRate) >= 30 && 'Outstanding! Keep up the excellent work.'}
                        {parseFloat(health.savingsRate) >= 20 && parseFloat(health.savingsRate) < 30 && 'Great job! You\'re saving well.'}
                        {parseFloat(health.savingsRate) >= 10 && parseFloat(health.savingsRate) < 20 && 'Good progress. Try to save a bit more.'}
                        {parseFloat(health.savingsRate) >= 0 && parseFloat(health.savingsRate) < 10 && 'Consider increasing your savings.'}
                        {parseFloat(health.savingsRate) < 0 && 'Warning: Spending exceeds income.'}
                    </p>
                </div>
            </div>
        </div>
    );
};
