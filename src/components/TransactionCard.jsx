import { HiPencil, HiTrash } from 'react-icons/hi';
import {
    MdFastfood,
    MdDirectionsCar,
    MdMovie,
    MdLightbulb,
    MdShoppingCart,
    MdLocalHospital,
    MdSchool,
    MdWork,
    MdTrendingUp,
    MdMoreHoriz,
} from 'react-icons/md';

const CATEGORY_ICONS = {
    food: MdFastfood,
    transport: MdDirectionsCar,
    entertainment: MdMovie,
    utilities: MdLightbulb,
    shopping: MdShoppingCart,
    health: MdLocalHospital,
    education: MdSchool,
    salary: MdWork,
    freelance: MdWork,
    investment: MdTrendingUp,
    other: MdMoreHoriz,
};

export const TransactionCard = ({ transaction, onEdit, onDelete }) => {
    const { title, amount, category, type, date } = transaction;
    const Icon = CATEGORY_ICONS[category] || MdMoreHoriz;

    const formattedDate = date ? new Date(date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }) : 'No date';

    return (
        <div className="glass-card-hover p-4 rounded-xl animate-slide-up hover-lift-sm">
            <div className="flex items-center justify-between">
                {/* Left: Icon and Details */}
                <div className="flex items-center gap-4 flex-1">
                    <div className={`p-3 rounded-xl ${type === 'income'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                        }`}>
                        <Icon className="text-2xl" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                            {title}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-300">
                            <span className="capitalize">{category}</span>
                            <span>•</span>
                            <span>{formattedDate}</span>
                        </div>
                    </div>
                </div>

                {/* Right: Amount and Actions */}
                <div className="flex items-center gap-4">
                    <span className={`text-xl font-bold ${type === 'income'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                        }`}>
                        {type === 'income' ? '+' : '-'}₹{Math.abs(amount).toLocaleString()}
                    </span>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onEdit(transaction)}
                            className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-300 transform hover:scale-110"
                            aria-label="Edit transaction"
                        >
                            <HiPencil className="text-lg" />
                        </button>
                        <button
                            onClick={() => onDelete(transaction)}
                            className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-300 transform hover:scale-110"
                            aria-label="Delete transaction"
                        >
                            <HiTrash className="text-lg" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
