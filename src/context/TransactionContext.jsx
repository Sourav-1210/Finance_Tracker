import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import {
    addTransaction as addTransactionFirebase,
    updateTransaction as updateTransactionFirebase,
    deleteTransaction as deleteTransactionFirebase,
    subscribeToTransactions,
} from '../firebase/transactions';

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [loading, setLoading] = useState(false);
    const [typeFilter, setTypeFilter] = useState('all');

    useEffect(() => {
        if (!user) {
            setTransactions([]);
            setFilteredTransactions([]);
            return;
        }

        setLoading(true);
        const unsubscribe = subscribeToTransactions(user.uid, (data) => {
            setTransactions(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    useEffect(() => {
        let filtered = [...transactions];

        if (searchTerm) {
            filtered = filtered.filter((t) =>
                t.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (categoryFilter !== 'all') {
            filtered = filtered.filter((t) => t.category === categoryFilter);
        }

        if (typeFilter !== 'all') {
            filtered = filtered.filter((t) => t.type === typeFilter);
        }

        setFilteredTransactions(filtered);
    }, [transactions, searchTerm, categoryFilter, typeFilter]);

    const addTransaction = async (transactionData) => {
        if (!user) return { error: 'User not authenticated' };

        const { id, error } = await addTransactionFirebase(user.uid, transactionData);
        return { id, error };
    };

    const updateTransaction = async (transactionId, transactionData) => {
        if (!user) return { error: 'User not authenticated' };

        const { error } = await updateTransactionFirebase(user.uid, transactionId, transactionData);
        return { error };
    };

    const deleteTransaction = async (transactionId) => {
        if (!user) return { error: 'User not authenticated' };

        const { error } = await deleteTransactionFirebase(user.uid, transactionId);
        return { error };
    };

    const getTotals = () => {
        const income = filteredTransactions
            .filter((t) => t.type === 'income')
            .reduce((sum, t) => sum + parseFloat(t.amount), 0);

        const expense = filteredTransactions
            .filter((t) => t.type === 'expense')
            .reduce((sum, t) => sum + parseFloat(t.amount), 0);

        return {
            income,
            expense,
            balance: income - expense,
        };
    };

    const getCategoryData = () => {
        const categoryMap = {};

        filteredTransactions
            .filter((t) => t.type === 'expense')
            .forEach((t) => {
                if (categoryMap[t.category]) {
                    categoryMap[t.category] += parseFloat(t.amount);
                } else {
                    categoryMap[t.category] = parseFloat(t.amount);
                }
            });

        return categoryMap;
    };

    const getMonthlyTrends = () => {
        const months = {};
        const now = new Date();

        for (let i = 11; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            months[monthKey] = { income: 0, expense: 0 };
        }

        transactions.forEach((t) => {
            if (!t.date) return;
            const date = new Date(t.date);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

            if (months[monthKey]) {
                if (t.type === 'income') {
                    months[monthKey].income += parseFloat(t.amount);
                } else {
                    months[monthKey].expense += parseFloat(t.amount);
                }
            }
        });

        return months;
    };

    const getTopCategories = (limit = 5) => {
        const categoryMap = {};
        let totalExpense = 0;

        transactions
            .filter((t) => t.type === 'expense')
            .forEach((t) => {
                const amount = parseFloat(t.amount);
                totalExpense += amount;
                if (categoryMap[t.category]) {
                    categoryMap[t.category] += amount;
                } else {
                    categoryMap[t.category] = amount;
                }
            });

        return Object.entries(categoryMap)
            .map(([category, amount]) => ({
                category,
                amount,
                percentage: totalExpense > 0 ? (amount / totalExpense) * 100 : 0,
            }))
            .sort((a, b) => b.amount - a.amount)
            .slice(0, limit);
    };

    const getFinancialHealth = () => {
        const totals = getTotals();
        const savingsRate = totals.income > 0
            ? ((totals.income - totals.expense) / totals.income) * 100
            : 0;

        let healthScore = 0;
        let status = 'critical';

        if (savingsRate >= 30) {
            healthScore = 90 + (savingsRate - 30) / 7; 
            status = 'excellent';
        } else if (savingsRate >= 20) {
            healthScore = 75 + (savingsRate - 20) * 1.5; 
            status = 'good';
        } else if (savingsRate >= 10) {
            healthScore = 60 + (savingsRate - 10) * 1.5; 
            status = 'fair';
        } else if (savingsRate >= 0) {
            healthScore = 30 + savingsRate * 3; 
            status = 'warning';
        } else {
            healthScore = Math.max(0, 30 + savingsRate); 
            status = 'critical';
        }

        return {
            score: Math.min(100, Math.max(0, healthScore)).toFixed(0),
            status,
            savingsRate: savingsRate.toFixed(1),
        };
    };

    
    const getInsights = () => {
        if (transactions.length === 0) {
            return {
                avgMonthlyIncome: 0,
                avgMonthlyExpense: 0,
                highestSpendingMonth: null,
                topCategory: null,
                totalTransactions: 0,
            };
        }

        const monthlyData = getMonthlyTrends();
        const months = Object.values(monthlyData);

        const avgMonthlyIncome = months.reduce((sum, m) => sum + m.income, 0) / months.length;
        const avgMonthlyExpense = months.reduce((sum, m) => sum + m.expense, 0) / months.length;

        let highestMonth = { key: '', expense: 0 };
        Object.entries(monthlyData).forEach(([key, data]) => {
            if (data.expense > highestMonth.expense) {
                highestMonth = { key, expense: data.expense };
            }
        });

        const topCategories = getTopCategories(1);

        return {
            avgMonthlyIncome,
            avgMonthlyExpense,
            highestSpendingMonth: highestMonth.key ? {
                month: highestMonth.key,
                amount: highestMonth.expense,
            } : null,
            topCategory: topCategories.length > 0 ? topCategories[0] : null,
            totalTransactions: transactions.length,
        };
    };

    const value = {
        transactions: filteredTransactions,
        allTransactions: transactions,
        loading,
        searchTerm,
        setSearchTerm,
        categoryFilter,
        setCategoryFilter,
        typeFilter,
        setTypeFilter,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        getTotals,
        getCategoryData,
        getMonthlyTrends,
        getTopCategories,
        getFinancialHealth,
        getInsights,
    };

    return (
        <TransactionContext.Provider value={value}>
            {children}
        </TransactionContext.Provider>
    );
};
