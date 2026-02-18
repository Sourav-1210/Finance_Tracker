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
                <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                    No category data available
                </div>
            </div>
        );
    }

    return (
        <div className="glass-card p-6 rounded-2xl animate-fade-in transition-transform duration-300 hover:-translate-y-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white heading-glow mb-6">
                Top Spending Categories
            </h3>
            <div className="space-y-5">
                {topCategories.map((item, index) => (
                    <div key={item.category} className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 text-white text-sm font-bold shadow-glow-green">
                                    {index + 1}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white capitalize">
                                        {item.category}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {item.percentage.toFixed(1)}% of total
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-gray-900 dark:text-white">
                                    ₹{item.amount.toLocaleString()}
                                </p>
                            </div>
                        </div>
                        <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                                className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                                style={{
                                    width: `${item.percentage}%`,
                                    backgroundColor: CATEGORY_COLORS[item.category] || '#6b7280',
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
