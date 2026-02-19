import { useState, useContext, useEffect } from 'react';
import { BudgetContext } from '../context/BudgetContext';
import { HiX } from 'react-icons/hi';

const EXPENSE_CATEGORIES = [
    { key: 'food', label: 'Food & Dining', emoji: '🍔' },
    { key: 'transport', label: 'Transport', emoji: '🚗' },
    { key: 'entertainment', label: 'Entertainment', emoji: '🎬' },
    { key: 'utilities', label: 'Utilities', emoji: '💡' },
    { key: 'shopping', label: 'Shopping', emoji: '🛍️' },
    { key: 'health', label: 'Health', emoji: '🏥' },
    { key: 'education', label: 'Education', emoji: '📚' },
    { key: 'other', label: 'Other', emoji: '📦' },
];

const getCurrentMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

const EMPTY_FORM = {
    category: 'food',
    amount: '',
    month: getCurrentMonth(),
};

export const AddBudgetModal = ({ isOpen, onClose, editBudget }) => {
    const { addBudget, updateBudget } = useContext(BudgetContext);
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Populate form when editing
    useEffect(() => {
        if (editBudget) {
            setFormData({
                category: editBudget.category || 'food',
                amount: editBudget.amount || '',
                month: editBudget.month || getCurrentMonth(),
            });
        } else {
            setFormData(EMPTY_FORM);
        }
        setError('');
    }, [editBudget, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const amount = parseFloat(formData.amount);
        if (!amount || amount <= 0) {
            setError('Please enter a valid amount greater than 0.');
            return;
        }

        setLoading(true);
        const data = { category: formData.category, amount, month: formData.month };
        const result = editBudget
            ? await updateBudget(editBudget.id, data)
            : await addBudget(data);
        setLoading(false);

        if (result.error) {
            setError(result.error);
        } else {
            onClose();
        }
    };

    if (!isOpen) return null;

    const selectedCat = EXPENSE_CATEGORIES.find((c) => c.key === formData.category);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 sm:p-4 animate-fade-in">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

            <div className="glass-card max-w-md w-full p-6 sm:p-8 rounded-2xl shadow-glass-lg relative z-10 animate-slide-down">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gradient">
                        {editBudget ? 'Edit Budget' : 'Add Budget'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                        <HiX className="text-2xl text-gray-600 dark:text-gray-400" />
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-xl text-red-700 dark:text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Category selector */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Category
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                            {EXPENSE_CATEGORIES.map((cat) => (
                                <button
                                    key={cat.key}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, category: cat.key })}
                                    className={`flex flex-col items-center gap-1 p-2 rounded-xl border text-xs font-medium transition-all duration-200 ${formData.category === cat.key
                                            ? 'bg-green-500 border-green-500 text-white shadow-glow-green'
                                            : 'bg-white/80 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-green-400 hover:text-green-600 dark:hover:text-green-400'
                                        }`}
                                >
                                    <span className="text-lg">{cat.emoji}</span>
                                    <span className="truncate w-full text-center leading-none">{cat.label.split(' ')[0]}</span>
                                </button>
                            ))}
                        </div>
                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                            Selected: <span className="font-semibold">{selectedCat?.emoji} {selectedCat?.label}</span>
                        </p>
                    </div>

                    {/* Amount input */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Budget Limit (₹)
                        </label>
                        <div className="relative">
                            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-400 text-sm">
                                ₹
                            </span>
                            <input
                                type="number"
                                min="1"
                                step="1"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                placeholder="e.g. 5000"
                                required
                                className="input-fintech pl-8"
                            />
                        </div>
                    </div>

                    {/* Month picker */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Month
                        </label>
                        <input
                            type="month"
                            value={formData.month}
                            onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                            required
                            className="input-fintech"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading
                            ? 'Saving...'
                            : editBudget
                                ? 'Update Budget'
                                : 'Add Budget'}
                    </button>
                </form>
            </div>
        </div>
    );
};
