import { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { HiSearch } from 'react-icons/hi';
import { MdFilterList } from 'react-icons/md';

const CATEGORIES = [
    'all',
    'food',
    'transport',
    'entertainment',
    'utilities',
    'shopping',
    'health',
    'education',
    'salary',
    'passive',
    'investment',
    'side_hustle',
    'other',
];

export const FilterSearch = () => {
    const {
        searchTerm,
        setSearchTerm,
        categoryFilter,
        setCategoryFilter,
        typeFilter,
        setTypeFilter,
    } = useContext(TransactionContext);

    return (
        <div className="glass-card p-6 rounded-2xl mb-6 hover-lift-sm">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1 relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-300">
                        <HiSearch className="text-xl" />
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search transactions..."
                        className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200/80 dark:border-white/10 bg-white/95 dark:bg-gradient-to-r dark:from-[#111827] dark:to-[#020617] text-gray-900 dark:text-slate-50 placeholder-gray-500 dark:placeholder-slate-400 focus:border-primary-500 dark:focus:border-secondary-400 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-secondary-400/40 shadow-sm dark:shadow-glass transition-all duration-200 outline-none"
                    />
                </div>

                <div className="relative md:w-64">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-300 pointer-events-none">
                        <MdFilterList className="text-xl" />
                    </div>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200/80 dark:border-white/10 bg-white/95 dark:bg-white/5 text-gray-900 dark:text-slate-50 focus:border-primary-500 dark:focus:border-secondary-400 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-secondary-400/40 shadow-sm dark:shadow-glass transition-all duration-200 outline-none appearance-none cursor-pointer"
                    >
                        {CATEGORIES.map((category) => (
                            <option
                                key={category}
                                value={category}
                                className="bg-white text-gray-900 dark:bg-[#020617] dark:text-slate-50"
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
                {['all', 'income', 'expense'].map((type) => (
                    <button
                        key={type}
                        type="button"
                        onClick={() => setTypeFilter(type)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                            typeFilter === type
                                ? 'bg-primary-500 text-white border-primary-500 shadow-sm'
                                : 'bg-white/80 dark:bg-white/5 text-gray-600 dark:text-slate-300 border-gray-200/60 dark:border-white/10 hover:bg-primary-50/80 dark:hover:bg-white/10'
                        }`}
                    >
                        {type === 'all'
                            ? 'All'
                            : type === 'income'
                            ? 'Income'
                            : 'Expense'}
                    </button>
                ))}
            </div>
        </div>
    );
};
