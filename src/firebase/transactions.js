import {
    ref,
    push,
    set,
    update,
    remove,
    get,
    query,
    orderByChild,
    equalTo,
    onValue,
    serverTimestamp,
} from 'firebase/database';
import { db } from './config';

// Add a new transaction
export const addTransaction = async (userId, transactionData) => {
    try {
        const transactionsRef = ref(db, `transactions/${userId}`);
        const newTransactionRef = push(transactionsRef);

        await set(newTransactionRef, {
            ...transactionData,
            userId,
            createdAt: serverTimestamp(),
        });

        return { id: newTransactionRef.key, error: null };
    } catch (error) {
        return { id: null, error: error.message };
    }
};

// Update a transaction
export const updateTransaction = async (userId, transactionId, transactionData) => {
    try {
        const transactionRef = ref(db, `transactions/${userId}/${transactionId}`);
        await update(transactionRef, {
            ...transactionData,
            updatedAt: serverTimestamp(),
        });
        return { error: null };
    } catch (error) {
        return { error: error.message };
    }
};

// Delete a transaction
export const deleteTransaction = async (userId, transactionId) => {
    try {
        const transactionRef = ref(db, `transactions/${userId}/${transactionId}`);
        await remove(transactionRef);
        return { error: null };
    } catch (error) {
        return { error: error.message };
    }
};

// Get all transactions for a user (one-time read)
export const getUserTransactions = async (userId) => {
    try {
        const transactionsRef = ref(db, `transactions/${userId}`);
        const snapshot = await get(transactionsRef);

        const transactions = [];
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                transactions.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val(),
                });
            });
        }

        // Sort by createdAt in descending order
        transactions.sort((a, b) => {
            const timeA = a.createdAt || 0;
            const timeB = b.createdAt || 0;
            return timeB - timeA;
        });

        return { transactions, error: null };
    } catch (error) {
        return { transactions: [], error: error.message };
    }
};

// Real-time listener for user transactions
export const subscribeToTransactions = (userId, callback) => {
    const transactionsRef = ref(db, `transactions/${userId}`);

    return onValue(transactionsRef, (snapshot) => {
        const transactions = [];
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                transactions.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val(),
                });
            });
        }

        // Sort by createdAt in descending order
        transactions.sort((a, b) => {
            const timeA = a.createdAt || 0;
            const timeB = b.createdAt || 0;
            return timeB - timeA;
        });

        callback(transactions);
    });
};
