import { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';

const CATEGORY_COLORS = {
    food: '#ef4444',
    transport: '#f59e0b',
    entertainment: '#8b5cf6',
    utilities: '#3b82f6',
    shopping: '#ec4899',
    health: '#10b981',
    education: '#06b6d4',
    other: '#6b7280',
};

export const TopCategoriesCard = () => {
    const { getTopCategories } = useContext(TransactionContext);
    const topCategories = getTopCategories(5);

    if (topCategories.length === 0) {
        return (
            <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Top Spending Categories
                </h3>
                <div className="flex items-center justify-center h-64 text-gray-400 dark:text-slate-500 text-sm">
                    No category data available
                </div>
            </div>
        );
    }

    return (
        <div className="glass-card p-6 rounded-2xl animate-fade-in transition-transform duration-300 hover:-translate-y-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white heading-glow mb-5">
                Top Spending Categories
            </h3>
            <div className="space-y-4">
                {topCategories.map((item, index) => {
                    const color = CATEGORY_COLORS[item.category] || '#6b7280';
                    return (
                        <div key={item.category}>
                            <div className="flex items-center justify-between mb-1.5">
                                <div className="flex items-center gap-3">
                                    {/* Rank badge */}
                                    <div className="flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold bg-gradient-to-br from-primary-500 to-primary-600 text-white">
                                        {index + 1}
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-slate-200 capitalize">
                                        {item.category}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                                        ₹{item.amount.toLocaleString()}
                                    </p>
                                    <p className="text-xs text-gray-400 dark:text-slate-500">
                                        {item.percentage.toFixed(1)}%
                                    </p>
                                </div>
                            </div>
                            {/* Progress bar */}
                            <div className="relative w-full h-1.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div
                                    className="absolute top-0 left-0 h-full rounded-full transition-all duration-700"
                                    style={{
                                        width: `${item.percentage}%`,
                                        backgroundColor: color,
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
