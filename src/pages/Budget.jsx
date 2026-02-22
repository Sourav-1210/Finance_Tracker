import { useState, useContext } from 'react';
import { Navbar } from '../components/Navbar';
import { FloatingShapes } from '../components/FloatingShapes';
import { BudgetContext } from '../context/BudgetContext';
import { BudgetCard } from '../components/BudgetCard';
import { AddBudgetModal } from '../components/AddBudgetModal';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { MdAccountBalanceWallet, MdAdd } from 'react-icons/md';

// Month label helper
const formatMonth = (s) => {
    if (!s) return '';
    const [y, m] = s.split('-');
    return new Date(y, parseInt(m) - 1, 1).toLocaleString('default', {
        month: 'long',
        year: 'numeric',
    });
};

export const Budget = () => {
    const { budgets, loading, deleteBudget, getCurrentMonth } = useContext(BudgetContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editBudget, setEditBudget] = useState(null);
    const [budgetToDelete, setBudgetToDelete] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Group budgets by month (newest month first)
    const grouped = budgets.reduce((acc, b) => {
        const m = b.month || 'unknown';
        if (!acc[m]) acc[m] = [];
        acc[m].push(b);
        return acc;
    }, {});
    const sortedMonths = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

    const handleEdit = (budget) => {
        setEditBudget(budget);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (budget) => {
        setBudgetToDelete(budget);
        setShowDeleteConfirm(true);
    };

    const handleDeleteConfirm = async () => {
        if (budgetToDelete) {
            await deleteBudget(budgetToDelete.id);
            setBudgetToDelete(null);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditBudget(null);
    };

    const currentMonth = getCurrentMonth();

    return (
        <div className="min-h-screen relative">
            <FloatingShapes />
            <Navbar />

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">

                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-glow-green">
                                <MdAccountBalanceWallet className="text-white text-2xl" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white heading-glow">
                                Budget Planner
                            </h1>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 ml-14">
                            Set monthly category limits and track your spending
                        </p>
                    </div>

                    <button
                        onClick={() => { setEditBudget(null); setIsModalOpen(true); }}
                        className="btn-primary flex items-center gap-2 self-start sm:self-auto"
                    >
                        <MdAdd size={20} />
                        Add Budget
                    </button>
                </div>

                {/* Loading state */}
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {[...Array(4)].map((_, i) => (
                            <LoadingSkeleton key={i} />
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!loading && budgets.length === 0 && (
                    <div className="glass-card rounded-2xl flex flex-col items-center justify-center py-20 gap-4">
                        <span className="text-6xl">💰</span>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                            No budgets yet
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-center max-w-xs">
                            Set a monthly budget for each spending category to keep your finances on track.
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="btn-primary flex items-center gap-2 mt-2"
                        >
                            <MdAdd size={18} />
                            Create your first budget
                        </button>
                    </div>
                )}

                {/* Budget grouped by month */}
                {!loading && budgets.length > 0 && sortedMonths.map((month) => (
                    <div key={month} className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                                {formatMonth(month)}
                            </h2>
                            {month === currentMonth && (
                                <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2 py-0.5 rounded-full border border-green-200 dark:border-green-500/20">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    Current Month
                                </span>
                            )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {grouped[month].map((budget) => (
                                <BudgetCard
                                    key={budget.id}
                                    budget={budget}
                                    onEdit={handleEdit}
                                    onDelete={handleDeleteClick}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </main>

            {/* Add / Edit Modal */}
            <AddBudgetModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                editBudget={editBudget}
            />

            {/* Delete Confirmation */}
            <ConfirmationModal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={handleDeleteConfirm}
                title="Delete Budget?"
                message={`This will permanently delete the ${budgetToDelete?.category} budget. This action cannot be undone.`}
            />
        </div>
    );
};
