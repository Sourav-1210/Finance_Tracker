import { HiExclamation } from 'react-icons/hi';

export const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                onClick={onClose}
            ></div>
            <div className="glass-card max-w-sm w-full p-6 rounded-2xl shadow-glass-lg relative z-10 animate-slide-up">
                <div className="flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full mx-auto mb-4 shadow-glass">
                    <HiExclamation className="text-3xl text-red-600 dark:text-red-400" />
                </div>

                <h3 className="text-xl font-bold text-center text-gray-900 dark:text-slate-50 mb-2">
                    {title || 'Are you sure?'}
                </h3>
                <p className="text-center text-gray-600 dark:text-slate-400 mb-6">
                    {message || 'This action cannot be undone.'}
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-sm hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300 font-semibold text-gray-800 dark:text-slate-100 hover-lift-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="flex-1 px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover-lift-sm"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};
