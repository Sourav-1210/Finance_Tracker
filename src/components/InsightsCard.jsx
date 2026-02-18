import { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { FaMoneyBillWave, FaChartLine, FaTrophy, FaReceipt } from 'react-icons/fa';

export const InsightsCard = () => {
    const { getInsights } = useContext(TransactionContext);
    const insights = getInsights();

    const formatMonth = (monthKey) => {
        if (!monthKey) return 'N/A';
        const [year, month] = monthKey.split('-');
        const date = new Date(year, parseInt(month) - 1);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    const insightItems = [
        {
            icon: FaMoneyBillWave,
            label: 'Avg Monthly Income',
            value: `₹${Math.round(insights.avgMonthlyIncome).toLocaleString()}`,
            color: 'from-green-500 to-emerald-600',
            bgColor: 'bg-green-50 dark:bg-green-900/20',
            iconColor: 'text-green-600 dark:text-green-400',
        },
        {
            icon: FaChartLine,
            label: 'Avg Monthly Expense',
            value: `₹${Math.round(insights.avgMonthlyExpense).toLocaleString()}`,
            color: 'from-red-500 to-red-600',
            bgColor: 'bg-red-50 dark:bg-red-900/20',
            iconColor: 'text-red-600 dark:text-red-400',
        },
        {
            icon: FaTrophy,
            label: 'Highest Spending Month',
            value: insights.highestSpendingMonth
                ? formatMonth(insights.highestSpendingMonth.month)
                : 'N/A',
            subValue: insights.highestSpendingMonth
                ? `₹${Math.round(insights.highestSpendingMonth.amount).toLocaleString()}`
                : '',
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50 dark:bg-purple-900/20',
            iconColor: 'text-purple-600 dark:text-purple-400',
        },
        {
            icon: FaReceipt,
            label: 'Top Spending Category',
            value: insights.topCategory
                ? insights.topCategory.category.charAt(0).toUpperCase() + insights.topCategory.category.slice(1)
                : 'N/A',
            subValue: insights.topCategory
                ? `₹${Math.round(insights.topCategory.amount).toLocaleString()}`
                : '',
            color: 'from-primary-500 to-primary-600',
            bgColor: 'bg-primary-50 dark:bg-primary-900/20',
            iconColor: 'text-primary-600 dark:text-primary-400',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insightItems.map((item, index) => (
                <div
                    key={index}
                    className="glass-card p-6 rounded-2xl animate-fade-in transition-all duration-300 hover:-translate-y-1 hover:shadow-glass-lg"
                >
                    <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-xl ${item.bgColor} flex items-center justify-center flex-shrink-0`}>
                            <item.icon className={`text-2xl ${item.iconColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                {item.label}
                            </p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white truncate">
                                {item.value}
                            </p>
                            {item.subValue && (
                                <p className={`text-sm font-medium mt-1 ${item.iconColor}`}>
                                    {item.subValue}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
