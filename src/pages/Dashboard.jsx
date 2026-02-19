import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { FloatingShapes } from '../components/FloatingShapes';
import { SummaryCards } from '../components/SummaryCards';
import { FilterSearch } from '../components/FilterSearch';
import { TransactionList } from '../components/TransactionList';
import { SpendingPieChart } from '../components/SpendingPieChart';
import { MonthlyBarChart } from '../components/MonthlyBarChart';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { AddTransactionModal } from '../components/AddTransactionModal';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { BudgetSummary } from '../components/BudgetSummary';

export const Dashboard = () => {
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
            const { deleteTransaction: deleteFunc } = await import('../context/TransactionContext');
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

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">

                <SummaryCards />

                <BudgetSummary />

                <FilterSearch />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <MonthlyBarChart />
                        <SpendingPieChart />
                    </div>

                    <div className="lg:col-span-1">
                        <TransactionList onEdit={handleEdit} onDelete={handleDelete} />
                    </div>
                </div>
            </main>


            <FloatingActionButton onClick={() => setIsModalOpen(true)} />


            <AddTransactionModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                editTransaction={editTransaction}
            />

            <ConfirmationModal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={confirmDelete}
                title="Delete Transaction?"
                message="This transaction will be permanently deleted. This action cannot be undone."
            />
        </div>
    );
};
