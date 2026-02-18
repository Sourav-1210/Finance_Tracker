import { useContext, useState } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { TransactionCard } from './TransactionCard';
import { EmptyState } from './EmptyState';
import { LoadingSkeleton } from './LoadingSkeleton';

export const TransactionList = ({ onEdit, onDelete }) => {
    const { transactions, loading } = useContext(TransactionContext);

    if (loading) {
        return (
            <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                    <LoadingSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (transactions.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white heading-glow mb-4">
                Recent Transactions
            </h2>
            {transactions.map((transaction) => (
                <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};
