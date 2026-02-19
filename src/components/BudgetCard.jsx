import { useContext } from 'react';
import { BudgetContext } from '../context/BudgetContext';
import { BudgetProgressBar } from './BudgetProgressBar';
import { MdEdit, MdDelete, MdWarning } from 'react-icons/md';

const CATEGORY_META = {
    food: { label: 'Food & Dining', emoji: '🍔', color: '#ef4444' },
    transport: { label: 'Transport', emoji: '🚗', color: '#f59e0b' },
    entertainment: { label: 'Entertainment', emoji: '🎬', color: '#8b5cf6' },
    utilities: { label: 'Utilities', emoji: '💡', color: '#3b82f6' },
    shopping: { label: 'Shopping', emoji: '🛍️', color: '#ec4899' },
    health: { label: 'Health', emoji: '🏥', color: '#10b981' },
    education: { label: 'Education', emoji: '📚', color: '#06b6d4' },
    other: { label: 'Other', emoji: '📦', color: '#6b7280' },
};

const formatMonth = (month) => {
    if (!month) return '';
    const [y, m] = month.split('-');
    return new Date(y, parseInt(m) - 1, 1).toLocaleString('default', { month: 'long', year: 'numeric' });
};

export const BudgetCard = ({ budget, onEdit, onDelete }) => {
    const { getSpentForBudget } = useContext(BudgetContext);

    const { category = 'other', amount = 0, month } = budget;
    const meta = CATEGORY_META[category] || CATEGORY_META.other;
    const limit = parseFloat(amount) || 0;
    const spent = getSpentForBudget(budget);
    const remaining = limit - spent;
    const pct = limit > 0 ? (spent / limit) * 100 : 0;
    const isOver = pct > 100;
    const isWarning = pct >= 80 && !isOver;

    return (
        <div className="glass-card-hover p-5 rounded-2xl flex flex-col gap-4 animate-fade-in">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                    <span
                        className="flex items-center justify-center w-10 h-10 rounded-xl text-xl shrink-0"
                        style={{ background: `${meta.color}20` }}
                    >
                        {meta.emoji}
                    </span>
                    <div>
                        <p className="text-sm font-semibold text-gray-800 dark:text-white leading-tight">
                            {meta.label}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                            {formatMonth(month)}
                        </p>
                    </div>
                </div>

                {/* Status badge + actions */}
                <div className="flex items-center gap-1.5 shrink-0">
                    {isOver && (
                        <span className="flex items-center gap-1 text-xs font-medium text-red-500 bg-red-50 dark:bg-red-500/10 px-2 py-0.5 rounded-full border border-red-200 dark:border-red-500/20">
                            <MdWarning size={11} />Over
                        </span>
                    )}
                    {isWarning && (
                        <span className="flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-500/20">
                            <MdWarning size={11} />!
                        </span>
                    )}
                    <button
                        onClick={() => onEdit(budget)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-green-500 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-500/10 transition-all duration-150"
                        aria-label="Edit budget"
                    >
                        <MdEdit size={16} />
                    </button>
                    <button
                        onClick={() => onDelete(budget)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-150"
                        aria-label="Delete budget"
                    >
                        <MdDelete size={16} />
                    </button>
                </div>
            </div>

            {/* Amount row */}
            <div className="flex items-end justify-between">
                <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Spent</p>
                    <p className={`text-xl font-bold ${isOver ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>
                        ₹{spent.toLocaleString()}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Limit</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                        ₹{limit.toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Progress bar */}
            <BudgetProgressBar pct={pct} size="md" />

            {/* Remaining / Over */}
            <div className="flex items-center justify-between">
                <p className={`text-xs font-medium ${isOver ? 'text-red-500' : remaining <= 0 ? 'text-amber-500' : 'text-green-600 dark:text-green-400'}`}>
                    {isOver
                        ? `Over by ₹${Math.abs(remaining).toLocaleString()}`
                        : `₹${remaining.toLocaleString()} remaining`}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                    {pct.toFixed(0)}% used
                </p>
            </div>
        </div>
    );
};
