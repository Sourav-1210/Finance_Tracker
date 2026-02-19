import { useState, useContext, useEffect } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { HiX } from 'react-icons/hi';

const EXPENSE_CATEGORIES = [
    'food',
    'transport',
    'entertainment',
    'utilities',
    'shopping',
    'health',
    'education',
    'other',
];

const INCOME_CATEGORIES = [
    { value: 'salary', label: 'Salary', emoji: '💼' },
    { value: 'passive', label: 'Passive Income', emoji: '💤' },
    { value: 'investment', label: 'Investment', emoji: '📈' },
    { value: 'side_hustle', label: 'Side Hustle', emoji: '🚀' },
    { value: 'other', label: 'Other', emoji: '✨' },
];

const PAYMENT_METHODS = ['cash', 'upi', 'bank'];

export const AddTransactionModal = ({ isOpen, onClose, editTransaction }) => {
    const { addTransaction, updateTransaction } = useContext(TransactionContext);

    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: 'food',
        type: 'expense',
        date: new Date().toISOString().split('T')[0],
        notes: '',
        paymentMethod: 'cash',
        isRecurring: false,
        categoryIcon: '💼',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (editTransaction) {
            setFormData({
                title: editTransaction.title,
                amount: editTransaction.amount,
                category: editTransaction.category,
                type: editTransaction.type,
                date: editTransaction.date || new Date().toISOString().split('T')[0],
                notes: editTransaction.notes || '',
                paymentMethod: editTransaction.paymentMethod || 'cash',
                isRecurring: !!editTransaction.isRecurring,
                categoryIcon: editTransaction.categoryIcon || '💼',
            });
        } else {
            setFormData({
                title: '',
                amount: '',
                category: 'food',
                type: 'expense',
                date: new Date().toISOString().split('T')[0],
                notes: '',
                paymentMethod: 'cash',
                isRecurring: false,
                categoryIcon: '💼',
            });
        }
    }, [editTransaction, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const transactionData = {
            ...formData,
            amount: parseFloat(formData.amount),
        };

        let result;
        if (editTransaction) {
            result = await updateTransaction(editTransaction.id, transactionData);
        } else {
            result = await addTransaction(transactionData);
        }

        setLoading(false);

        if (result.error) {
            setError(result.error);
        } else {
            setFormData({
                title: '',
                amount: '',
                category: 'food',
                type: 'expense',
                date: new Date().toISOString().split('T')[0],
            });
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center px-4 py-8 sm:p-4 animate-fade-in">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                onClick={onClose}
            ></div>

            <div className="glass-card max-w-md w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 rounded-2xl shadow-glass-lg relative z-10 animate-slide-up">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gradient">
                        {editTransaction ? 'Edit Transaction' : 'Add Transaction'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
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
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            {formData.type === 'income' ? 'Income Title / Source' : 'Title'}
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder={
                                formData.type === 'income'
                                    ? 'e.g. Salary, Freelance Project'
                                    : 'e.g., Grocery shopping'
                            }
                            required
                            className="input-fintech"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Amount
                        </label>
                        <div className="relative">
                            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-400 text-sm">
                                ₹
                            </span>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                placeholder="0.00"
                                required
                                className="input-fintech pl-8"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Category
                            </label>
                            {formData.type === 'income' && (
                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-[#9AA4B2]">
                                    <span className="opacity-80">Icon</span>
                                    <span className="text-base">{formData.categoryIcon}</span>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="select-fintech pr-10 appearance-none cursor-pointer"
                            >
                                {formData.type === 'income'
                                    ? INCOME_CATEGORIES.map((cat) => (
                                        <option
                                            key={cat.value}
                                            value={cat.value}
                                            className="bg-white text-gray-900 dark:bg-[#0B0F19] dark:text-[#E6EDF3]"
                                        >
                                            {cat.label}
                                        </option>
                                    ))
                                    : EXPENSE_CATEGORIES.map((cat) => (
                                        <option
                                            key={cat}
                                            value={cat}
                                            className="bg-white text-gray-900 dark:bg-[#0B0F19] dark:text-[#E6EDF3]"
                                        >
                                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                        </option>
                                    ))}
                            </select>
                            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 text-xs">
                                ▼
                            </span>
                        </div>
                        {formData.type === 'income' && (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {INCOME_CATEGORIES.map((cat) => (
                                    <button
                                        key={cat.value}
                                        type="button"
                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                                category: cat.value,
                                                categoryIcon: cat.emoji,
                                            })
                                        }
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                                            formData.category === cat.value
                                                ? 'bg-primary-500 text-white border-primary-500 shadow-sm'
                                                : 'bg-white/80 dark:bg-white/5 text-gray-600 dark:text-slate-300 border-gray-200/60 dark:border-white/10 hover:bg-primary-50/80 dark:hover:bg-white/10'
                                        }`}
                                    >
                                        <span>{cat.emoji}</span>
                                        <span>{cat.label}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Type
                        </label>
                        <div className="flex gap-4">
                            <label className="flex-1">
                                <input
                                    type="radio"
                                    name="type"
                                    value="expense"
                                    checked={formData.type === 'expense'}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="sr-only"
                                />
                                <div className={`p-3 rounded-xl text-center cursor-pointer transition-all duration-300 ${formData.type === 'expense'
                                        ? 'bg-red-500 text-white shadow-lg'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                                    }`}>
                                    Expense
                                </div>
                            </label>
                            <label className="flex-1">
                                <input
                                    type="radio"
                                    name="type"
                                    value="income"
                                    checked={formData.type === 'income'}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="sr-only"
                                />
                                <div className={`p-3 rounded-xl text-center cursor-pointer transition-all duration-300 ${formData.type === 'income'
                                        ? 'bg-green-500 text-white shadow-lg'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                                    }`}>
                                    Income
                                </div>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Date
                        </label>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            required
                            className="input-fintech"
                        />
                    </div>

                    {formData.type === 'income' && (
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Payment Method
                            </label>
                            <div className="flex gap-2">
                                {PAYMENT_METHODS.map((method) => (
                                    <button
                                        key={method}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, paymentMethod: method })}
                                        className={`flex-1 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
                                            formData.paymentMethod === method
                                                ? 'bg-emerald-500/90 text-white border-emerald-500 shadow-glow-green'
                                                : 'bg-white/80 dark:bg-white/5 text-gray-700 dark:text-slate-200 border-gray-200/60 dark:border-white/10 hover:bg-primary-50/80 dark:hover:bg-white/10'
                                        }`}
                                    >
                                        {method === 'cash'
                                            ? 'Cash'
                                            : method === 'upi'
                                            ? 'UPI'
                                            : 'Bank'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {formData.type === 'income' && (
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Recurring Income
                                </p>
                                <p className="text-xs text-gray-500 dark:text-[#9AA4B2]">
                                    Mark if this income repeats every month.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() =>
                                    setFormData({ ...formData, isRecurring: !formData.isRecurring })
                                }
                                className={`relative inline-flex h-7 w-12 items-center rounded-full border transition-colors duration-200 ${
                                    formData.isRecurring
                                        ? 'bg-emerald-500 border-emerald-400'
                                        : 'bg-gray-200 dark:bg-[#111827] border-gray-300 dark:border-white/10'
                                }`}
                            >
                                <span
                                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                                        formData.isRecurring ? 'translate-x-5' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Saving...' : editTransaction ? 'Update Transaction' : 'Add Transaction'}
                    </button>
                </form>
            </div>
        </div>
    );
};
