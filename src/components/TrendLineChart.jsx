import { useContext, useMemo } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TransactionContext } from '../context/TransactionContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export const TrendLineChart = () => {
    const { getMonthlyTrends } = useContext(TransactionContext);

    const chartData = useMemo(() => {
        const monthlyData = getMonthlyTrends();
        const sortedMonths = Object.keys(monthlyData).sort();

        return {
            labels: sortedMonths.map((key) => {
                const [year, month] = key.split('-');
                const date = new Date(year, parseInt(month) - 1);
                return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            }),
            income: sortedMonths.map((key) => monthlyData[key].income),
            expense: sortedMonths.map((key) => monthlyData[key].expense),
        };
    }, [getMonthlyTrends]);

    if (chartData.labels.length === 0) {
        return (
            <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    12-Month Trend
                </h3>
                <div className="flex items-center justify-center h-80 text-gray-500 dark:text-gray-400">
                    No trend data available
                </div>
            </div>
        );
    }

    const data = {
        labels: chartData.labels,
        datasets: [
            {
                label: 'Income',
                data: chartData.income,
                borderColor: 'rgba(16, 185, 129, 1)',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: 'rgba(16, 185, 129, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
            },
            {
                label: 'Expense',
                data: chartData.expense,
                borderColor: 'rgba(239, 68, 68, 1)',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: 'rgba(239, 68, 68, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
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
                        size: 11,
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
                12-Month Trend Analysis
            </h3>
            <div className="h-80">
                <Line data={data} options={options} />
            </div>
        </div>
    );
};
