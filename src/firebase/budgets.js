import {
    ref,
    push,
    set,
    update,
    remove,
    onValue,
    serverTimestamp,
} from 'firebase/database';
import { db } from './config';

// Add a new budget for a user
export const addBudget = async (userId, budgetData) => {
    try {
        const budgetsRef = ref(db, `budgets/${userId}`);
        const newBudgetRef = push(budgetsRef);
        await set(newBudgetRef, {
            ...budgetData,
            userId,
            createdAt: serverTimestamp(),
        });
        return { id: newBudgetRef.key, error: null };
    } catch (error) {
        return { id: null, error: error.message };
    }
};

// Update an existing budget
export const updateBudget = async (userId, budgetId, budgetData) => {
    try {
        const budgetRef = ref(db, `budgets/${userId}/${budgetId}`);
        await update(budgetRef, {
            ...budgetData,
            updatedAt: serverTimestamp(),
        });
        return { error: null };
    } catch (error) {
        return { error: error.message };
    }
};

// Delete a budget
export const deleteBudget = async (userId, budgetId) => {
    try {
        const budgetRef = ref(db, `budgets/${userId}/${budgetId}`);
        await remove(budgetRef);
        return { error: null };
    } catch (error) {
        return { error: error.message };
    }
};

// Real-time listener for all budgets of a user
export const subscribeToBudgets = (userId, callback, onError) => {
    const budgetsRef = ref(db, `budgets/${userId}`);
    return onValue(
        budgetsRef,
        (snapshot) => {
            const budgets = [];
            if (snapshot.exists()) {
                snapshot.forEach((child) => {
                    budgets.push({ id: child.key, ...child.val() });
                });
            }
            // Sort newest first
            budgets.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
            callback(budgets);
        },
        (error) => {
            console.error('Firebase budgets error:', error);
            if (onError) onError(error);
        }
    );
};
