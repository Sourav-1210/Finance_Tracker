import { useContext, useMemo } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { TransactionContext } from '../context/TransactionContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const MonthlyBarChart = () => {
    const { allTransactions } = useContext(TransactionContext);

    const monthlyData = useMemo(() => {
        const months = {};

        allTransactions.forEach((t) => {
            if (!t.date) return;

            const date = new Date(t.date);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

            if (!months[monthKey]) {
                months[monthKey] = { income: 0, expense: 0 };
            }

            if (t.type === 'income') {
                months[monthKey].income += parseFloat(t.amount);
            } else {
                months[monthKey].expense += parseFloat(t.amount);
            }
        });

        const sortedMonths = Object.keys(months).sort().slice(-6);

        return {
            labels: sortedMonths.map((key) => {
                const [year, month] = key.split('-');
                const date = new Date(year, parseInt(month) - 1);
                return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            }),
            income: sortedMonths.map((key) => months[key].income),
            expense: sortedMonths.map((key) => months[key].expense),
        };
    }, [allTransactions]);

    if (monthlyData.labels.length === 0) {
        return (
            <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Monthly Overview
                </h3>
                <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                    No monthly data available
                </div>
            </div>
        );
    }

    const data = {
        labels: monthlyData.labels,
        datasets: [
            {
                label: 'Income',
                data: monthlyData.income,
                backgroundColor: 'rgba(16, 185, 129, 0.8)',
                borderColor: 'rgba(16, 185, 129, 1)',
                borderWidth: 2,
                borderRadius: 8,
            },
            {
                label: 'Expense',
                data: monthlyData.expense,
                backgroundColor: 'rgba(239, 68, 68, 0.8)',
                borderColor: 'rgba(239, 68, 68, 1)',
                borderWidth: 2,
                borderRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    padding: 15,
                    font: {
                        size: 13,
                        family: 'Inter',
                        weight: '600',
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
                        const label = context.dataset.label || '';
                        const value = context.parsed.y || 0;
                        return `${label}: ₹${value.toLocaleString()}`;
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: typeof document !== 'undefined' && document.body.classList.contains('dark') ? '#ffffff' : '#6b7280',
                    font: {
                        size: 12,
                        family: 'Inter',
                    },
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(107, 114, 128, 0.1)',
                },
                ticks: {
                    color: typeof document !== 'undefined' && document.body.classList.contains('dark') ? '#ffffff' : '#6b7280',
                    font: {
                        size: 12,
                        family: 'Inter',
                    },
                    callback: (value) => `₹${value.toLocaleString()}`,
                },
            },
        },
    };

    return (
        <div className="glass-card p-6 rounded-2xl animate-fade-in transition-transform duration-300 hover:-translate-y-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white heading-glow mb-6">
                Monthly Overview
            </h3>
            <div className="h-80">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};
