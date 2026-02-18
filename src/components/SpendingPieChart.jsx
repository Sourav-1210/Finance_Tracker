import { useContext } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { TransactionContext } from '../context/TransactionContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const CATEGORY_COLORS = {
    food: '#ef4444',
    transport: '#f59e0b',
    entertainment: '#8b5cf6',
    utilities: '#3b82f6',
    shopping: '#ec4899',
    health: '#10b981',
    education: '#06b6d4',
    other: '#6b7280',
};

export const SpendingPieChart = () => {
    const { getCategoryData } = useContext(TransactionContext);
    const categoryData = getCategoryData();

    const categories = Object.keys(categoryData);
    const amounts = Object.values(categoryData);

    if (categories.length === 0) {
        return (
            <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Spending by Category
                </h3>
                <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                    No expense data available
                </div>
            </div>
        );
    }

    const data = {
        labels: categories.map((cat) => cat.charAt(0).toUpperCase() + cat.slice(1)),
        datasets: [
            {
                data: amounts,
                backgroundColor: categories.map((cat) => CATEGORY_COLORS[cat] || '#6b7280'),
                borderColor: categories.map(() => 'rgba(255, 255, 255, 0.8)'),
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 15,
                    font: {
                        size: 12,
                        family: 'Inter',
                    },
                    usePointStyle: true,
                    color: typeof document !== 'undefined' && document.body.classList.contains('dark') ? '#ffffff' : '#6b7280',
                },
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleFont: {
                    size: 14,
                    family: 'Inter',
                },
                bodyFont: {
                    size: 13,
                    family: 'Inter',
                },
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        return `${label}: ₹${value.toLocaleString()}`;
                    },
                },
            },
        },
    };

    return (
        <div className="glass-card p-6 rounded-2xl animate-fade-in transition-transform duration-300 hover:-translate-y-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white heading-glow mb-6">
                Spending by Category
            </h3>
            <div className="h-80">
                <Pie data={data} options={options} />
            </div>
        </div>
    );
};
