import { useState, useContext } from 'react';
import { Navbar } from '../components/Navbar';
import { FloatingShapes } from '../components/FloatingShapes';
import { FilterSearch } from '../components/FilterSearch';
import { TransactionList } from '../components/TransactionList';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { AddTransactionModal } from '../components/AddTransactionModal';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { TransactionContext } from '../context/TransactionContext';

export const Transactions = () => {
    const { deleteTransaction: deleteTxn } = useContext(TransactionContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editTransaction, setEditTransaction] = useState(null);
    const [deleteTransaction, setDeleteTransaction] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleEdit = (transaction) => {
        setEditTransaction(transaction);
        setIsModalOpen(true);
    };

    const handleDelete = (transaction) => {
        setDeleteTransaction(transaction);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        if (deleteTransaction) {
            await deleteTxn(deleteTransaction.id);
            setDeleteTransaction(null);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditTransaction(null);
    };

    return (
        <div className="min-h-screen relative">
            <FloatingShapes />
            <Navbar />

            <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
                <h1 className="text-4xl font-bold text-gradient heading-glow mb-8">
                    All Transactions
                </h1>

                {/* Filter & Search */}
                <FilterSearch />

                {/* Transaction List */}
                <TransactionList onEdit={handleEdit} onDelete={handleDelete} />
            </main>

            {/* Floating Action Button */}
            <FloatingActionButton onClick={() => setIsModalOpen(true)} />

            {/* Add/Edit Transaction Modal */}
            <AddTransactionModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                editTransaction={editTransaction}
            />

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={confirmDelete}
                title="Delete Transaction?"
                message="This transaction will be permanently deleted from your account."
            />
        </div>
    );
};
