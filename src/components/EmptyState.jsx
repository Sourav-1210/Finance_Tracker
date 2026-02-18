import { MdReceiptLong } from 'react-icons/md';

export const EmptyState = () => {
    return (
        <div className="glass-card p-12 rounded-2xl text-center animate-fade-in hover-lift-sm">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-[#111827] dark:via-[#020617] dark:to-[#020617] rounded-full mb-6 shadow-glass">
                <MdReceiptLong className="text-5xl text-gray-500 dark:text-slate-200" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-50 mb-2">
                No Transactions Yet
            </h3>
            <p className="text-gray-600 dark:text-slate-400 mb-6">
                Start tracking your finances by adding your first transaction
            </p>
            <div className="text-sm text-gray-500 dark:text-slate-500">
                Click the <span className="text-primary-600 dark:text-secondary-400 font-semibold">+</span> button below to get started
            </div>
        </div>
    );
};
