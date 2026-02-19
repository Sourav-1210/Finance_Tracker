import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BudgetContext } from '../context/BudgetContext';
import { BudgetProgressBar } from './BudgetProgressBar';
import { MdAccountBalanceWallet, MdWarning, MdArrowForward } from 'react-icons/md';

const CATEGORY_META = {
    food: { label: 'Food', emoji: '🍔' },
    transport: { label: 'Transport', emoji: '🚗' },
    entertainment: { label: 'Entertainment', emoji: '🎬' },
    utilities: { label: 'Utilities', emoji: '💡' },
    shopping: { label: 'Shopping', emoji: '🛍️' },
    health: { label: 'Health', emoji: '🏥' },
    education: { label: 'Education', emoji: '📚' },
    other: { label: 'Other', emoji: '📦' },
};

export const BudgetSummary = () => {
    const { getBudgetStats, getSpentForBudget } = useContext(BudgetContext);
    const { totalBudget, totalSpent, overCount, budgetCount, currentMonthBudgets } = getBudgetStats();

    const overallPct = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
    const remaining = totalBudget - totalSpent;

    // Top 3 categories sorted by pct usage
    const topBudgets = [...currentMonthBudgets]
        .map((b) => {
            const spent = getSpentForBudget(b);
            const limit = parseFloat(b.amount) || 0;
            const pct = limit > 0 ? (spent / limit) * 100 : 0;
            return { ...b, spent, limit, pct };
        })
        .sort((a, b) => b.pct - a.pct)
        .slice(0, 3);

    // Empty state
    if (budgetCount === 0) {
        return (
            <div className="glass-card p-6 rounded-2xl mb-8 animate-fade-in">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-glow-green shrink-0">
                        <MdAccountBalanceWallet className="text-white text-xl" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white heading-glow">Budget Overview</h2>
                </div>
                <div className="flex flex-col items-center justify-center py-6 gap-3">
                    <p className="text-4xl">💰</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
                        No budgets set for this month.
                    </p>
                    <Link
                        to="/budget"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors duration-200"
                    >
                        Set up budgets <MdArrowForward size={16} />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="glass-card p-6 rounded-2xl mb-8 animate-fade-in">
            {/* Card Header */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-glow-green shrink-0">
                        <MdAccountBalanceWallet className="text-white text-xl" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white heading-glow">
                        Budget Overview
                    </h2>
                </div>
                <div className="flex items-center gap-2">
                    {overCount > 0 && (
                        <span className="flex items-center gap-1 text-xs font-semibold text-red-500 bg-red-50 dark:bg-red-500/10 px-2.5 py-1 rounded-full border border-red-200 dark:border-red-500/20 animate-pulse">
                            <MdWarning size={13} />
                            {overCount} Over Budget
                        </span>
                    )}
                    <Link
                        to="/budget"
                        className="text-xs font-semibold text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors duration-200 flex items-center gap-1"
                    >
                        Manage <MdArrowForward size={14} />
                    </Link>
                </div>
            </div>

            {/* Summary row */}
            <div className="grid grid-cols-3 gap-4 mb-5">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Budget</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">₹{totalBudget.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Spent</p>
                    <p className={`text-xl font-bold ${overallPct > 100 ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>
                        ₹{totalSpent.toLocaleString()}
                    </p>
                </div>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Left</p>
                    <p className={`text-xl font-bold ${remaining < 0 ? 'text-red-500' : 'text-green-600 dark:text-green-400'}`}>
                        {remaining < 0 ? '-' : ''}₹{Math.abs(remaining).toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Overall progress */}
            <div className="mb-5">
                <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mb-1.5">
                    <span>Overall usage</span>
                    <span>{overallPct.toFixed(0)}%</span>
                </div>
                <BudgetProgressBar pct={overallPct} size="md" />
            </div>

            {/* Top category rows */}
            {topBudgets.length > 0 && (
                <div className="space-y-3 border-t border-gray-100 dark:border-white/[0.05] pt-4">
                    {topBudgets.map((b) => {
                        const meta = CATEGORY_META[b.category] || CATEGORY_META.other;
                        return (
                            <div key={b.id}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-400">
                                        <span>{meta.emoji}</span> {meta.label}
                                    </span>
                                    <span className={`text-xs font-semibold ${b.pct > 100 ? 'text-red-500' : b.pct >= 80 ? 'text-amber-500' : 'text-gray-600 dark:text-gray-400'}`}>
                                        ₹{b.spent.toLocaleString()} / ₹{b.limit.toLocaleString()}
                                    </span>
                                </div>
                                <BudgetProgressBar pct={b.pct} size="sm" />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
