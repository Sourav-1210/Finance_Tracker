import { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { useCounter } from '../hooks/useCounter';
import { HiTrendingUp, HiTrendingDown, HiCash } from 'react-icons/hi';

export const SummaryCards = () => {
    const { getTotals } = useContext(TransactionContext);
    const { balance, income, expense } = getTotals();

    // Animated counters
    const animatedBalance = useCounter(balance);
    const animatedIncome = useCounter(income);
    const animatedExpense = useCounter(expense);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Balance Card - Discord Style */}
            <div className="glass-card-hover p-6 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 text-white transition-transform duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wide opacity-90">
                        Total Balance
                    </h3>
                    <div className="p-2 bg-white/20 rounded-lg">
                        <HiCash className="text-2xl" />
                    </div>
                </div>
                <p className="text-4xl font-bold mb-2 animate-count">
                    ₹{animatedBalance.toLocaleString()}
                </p>
                <p className="text-sm opacity-80">
                    {balance >= 0 ? 'In good standing' : 'Needs attention'}
                </p>
            </div>

            {/* Income Card - Discord Style */}
            <div className="glass-card-hover p-6 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white transition-transform duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wide opacity-90">
                        Total Income
                    </h3>
                    <div className="p-2 bg-white/20 rounded-lg">
                        <HiTrendingUp className="text-2xl" />
                    </div>
                </div>
                <p className="text-4xl font-bold mb-2 animate-count">
                    ₹{animatedIncome.toLocaleString()}
                </p>
                <p className="text-sm opacity-80">
                    This period
                </p>
            </div>

            {/* Expense Card - Discord Style */}
            <div className="glass-card-hover p-6 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-white transition-transform duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wide opacity-90">
                        Total Expense
                    </h3>
                    <div className="p-2 bg-white/20 rounded-lg">
                        <HiTrendingDown className="text-2xl" />
                    </div>
                </div>
                <p className="text-4xl font-bold mb-2 animate-count">
                    ₹{animatedExpense.toLocaleString()}
                </p>
                <p className="text-sm opacity-80">
                    This period
                </p>
            </div>
        </div>
    );
};
