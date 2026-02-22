import { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { useCounter } from '../hooks/useCounter';

export const SummaryCards = () => {
    const { getTotals } = useContext(TransactionContext);
    const { balance, income: totalIncome, expense: totalExpense } = getTotals();

    const animatedBalance = useCounter(balance ?? 0);
    const animatedIncome = useCounter(totalIncome ?? 0);
    const animatedExpense = useCounter(totalExpense ?? 0);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            {/* Balance */}
            <div className="glass-card-hover p-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white transition-transform duration-300 hover:-translate-y-1">
                <h3 className="text-sm font-semibold opacity-80 mb-2">Total Balance</h3>
                <p className="text-3xl font-bold">₹{animatedBalance.toLocaleString()}</p>
                <p className="text-xs mt-1 opacity-70">Current financial standing</p>
            </div>

            {/* Income */}
            <div className="glass-card-hover p-6 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white transition-transform duration-300 hover:-translate-y-1">
                <h3 className="text-sm font-semibold opacity-80 mb-2">Total Income</h3>
                <p className="text-3xl font-bold">₹{animatedIncome.toLocaleString()}</p>
                <p className="text-xs mt-1 opacity-70">Money earned</p>
            </div>

            {/* Expense */}
            <div className="glass-card-hover p-6 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-white transition-transform duration-300 hover:-translate-y-1">
                <h3 className="text-sm font-semibold opacity-80 mb-2">Total Expense</h3>
                <p className="text-3xl font-bold">₹{animatedExpense.toLocaleString()}</p>
                <p className="text-xs mt-1 opacity-70">Money spent</p>
            </div>
        </div>
    );
};
