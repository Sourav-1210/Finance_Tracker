import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { TransactionContext } from './TransactionContext';
import {
    addBudget as addBudgetFirebase,
    updateBudget as updateBudgetFirebase,
    deleteBudget as deleteBudgetFirebase,
    subscribeToBudgets,
} from '../firebase/budgets';

// Safe default so consumers don't crash if context is accessed before Provider initializes
const defaultContext = {
    budgets: [],
    loading: false,
    addBudget: async () => ({ error: 'No provider' }),
    updateBudget: async () => ({ error: 'No provider' }),
    deleteBudget: async () => ({ error: 'No provider' }),
    getSpentForBudget: () => 0,
    getBudgetStats: () => ({
        totalBudget: 0,
        totalSpent: 0,
        overCount: 0,
        budgetCount: 0,
        currentMonthBudgets: [],
    }),
    getCurrentMonth: () => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    },
};

export const BudgetContext = createContext(defaultContext);

// Returns current month string "YYYY-MM"
const getCurrentMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

export const BudgetProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const transactionCtx = useContext(TransactionContext);
    const allTransactions = transactionCtx?.allTransactions ?? [];
    const [budgets, setBudgets] = useState([]);
    const [loading, setLoading] = useState(false);

    // Subscribe to Firebase budgets in real-time
    useEffect(() => {
        if (!user) {
            setBudgets([]);
            return;
        }
        setLoading(true);
        const unsubscribe = subscribeToBudgets(
            user.uid,
            (data) => {
                setBudgets(data);
                setLoading(false);
            },
            (error) => {
                console.error('Budget subscribe error:', error);
                setLoading(false);
            }
        );
        return () => unsubscribe();
    }, [user]);

    // --- CRUD helpers ---
    const addBudget = async (budgetData) => {
        if (!user) return { error: 'Not authenticated' };
        return addBudgetFirebase(user.uid, budgetData);
    };

    const updateBudget = async (budgetId, budgetData) => {
        if (!user) return { error: 'Not authenticated' };
        return updateBudgetFirebase(user.uid, budgetId, budgetData);
    };

    const deleteBudget = async (budgetId) => {
        if (!user) return { error: 'Not authenticated' };
        return deleteBudgetFirebase(user.uid, budgetId);
    };

    // --- Spending computation ---
    // Returns total amount spent for a given budget (matches category + month)
    const getSpentForBudget = (budget) => {
        if (!budget || !allTransactions) return 0;
        return allTransactions
            .filter((t) => {
                if (t.type !== 'expense' || !t.date) return false;
                const d = new Date(t.date);
                const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
                return (
                    t.category === budget.category &&
                    monthKey === budget.month
                );
            })
            .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
    };

    // Returns aggregate stats for the current month's budgets
    const getBudgetStats = () => {
        const currentMonth = getCurrentMonth();
        const thisMonthBudgets = budgets.filter((b) => b.month === currentMonth);

        let totalBudget = 0;
        let totalSpent = 0;
        let overCount = 0;

        thisMonthBudgets.forEach((b) => {
            const limit = parseFloat(b.amount) || 0;
            const spent = getSpentForBudget(b);
            totalBudget += limit;
            totalSpent += spent;
            if (spent > limit && limit > 0) overCount++;
        });

        return {
            totalBudget,
            totalSpent,
            overCount,
            budgetCount: thisMonthBudgets.length,
            currentMonthBudgets: thisMonthBudgets,
        };
    };

    const value = {
        budgets,
        loading,
        addBudget,
        updateBudget,
        deleteBudget,
        getSpentForBudget,
        getBudgetStats,
        getCurrentMonth,
    };

    return (
        <BudgetContext.Provider value={value}>
            {children}
        </BudgetContext.Provider>
    );
};
