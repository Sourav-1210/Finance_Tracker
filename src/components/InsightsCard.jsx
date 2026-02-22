import { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { FaMoneyBillWave, FaChartLine, FaTrophy, FaReceipt } from 'react-icons/fa';

const INSIGHT_CONFIG = [
    {
        icon: FaMoneyBillWave,
        label: 'Avg Monthly Income',
        key: 'avgMonthlyIncome',
        color: 'text-primary-500',
        bg: 'bg-primary-500/10',
    },
    {
        icon: FaChartLine,
        label: 'Avg Monthly Expense',
        key: 'avgMonthlyExpense',
        color: 'text-red-500',
        bg: 'bg-red-500/10',
    },
    {
        icon: FaTrophy,
        label: 'Highest Spending Month',
        key: 'highestSpendingMonth',
        color: 'text-yellow-500',
        bg: 'bg-yellow-500/10',
    },
    {
        icon: FaReceipt,
        label: 'Top Spending Category',
        key: 'topCategory',
        color: 'text-purple-500',
        bg: 'bg-purple-500/10',
    },
];

const formatMonth = (monthKey) => {
    if (!monthKey) return 'N/A';
    const [year, month] = monthKey.split('-');
    const date = new Date(year, parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const InsightsCard = () => {
    const { getInsights } = useContext(TransactionContext);
    const insights = getInsights();

    const values = [
        {
            value: `₹${Math.round(insights.avgMonthlyIncome).toLocaleString()}`,
            subValue: null,
        },
        {
            value: `₹${Math.round(insights.avgMonthlyExpense).toLocaleString()}`,
            subValue: null,
        },
        {
            value: insights.highestSpendingMonth
                ? formatMonth(insights.highestSpendingMonth.month)
                : 'N/A',
            subValue: insights.highestSpendingMonth
                ? `₹${Math.round(insights.highestSpendingMonth.amount).toLocaleString()}`
                : '',
        },
        {
            value: insights.topCategory
                ? insights.topCategory.category.charAt(0).toUpperCase() +
                insights.topCategory.category.slice(1)
                : 'N/A',
            subValue: insights.topCategory
                ? `₹${Math.round(insights.topCategory.amount).toLocaleString()}`
                : '',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INSIGHT_CONFIG.map((cfg, index) => {
                const { value, subValue } = values[index];
                return (
                    <div
                        key={index}
                        className="glass-card p-5 rounded-2xl animate-fade-in transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className={`w-10 h-10 rounded-xl ${cfg.bg} flex items-center justify-center`}>
                                <cfg.icon className={`text-lg ${cfg.color}`} />
                            </div>
                            <p className="text-xs text-gray-500 dark:text-slate-400 leading-tight">
                                {cfg.label}
                            </p>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white truncate">
                            {value}
                        </p>
                        {subValue && (
                            <p className={`text-sm font-semibold mt-1 ${cfg.color}`}>
                                {subValue}
                            </p>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
