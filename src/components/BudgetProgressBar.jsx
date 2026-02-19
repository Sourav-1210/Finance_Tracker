// Reusable gradient progress bar for budget usage
// pct: 0-100 number, size: 'sm' | 'md'
export const BudgetProgressBar = ({ pct = 0, size = 'md' }) => {
    const clamped = Math.min(pct, 100);

    const barColor =
        pct > 100
            ? 'linear-gradient(90deg, #ef4444, #dc2626)'   // exceeded — red
            : pct >= 80
                ? 'linear-gradient(90deg, #f59e0b, #d97706)'   // warning — amber
                : 'linear-gradient(90deg, #22c55e, #10b981)';  // safe — green

    const height = size === 'sm' ? 'h-1.5' : 'h-2.5';

    return (
        <div className={`w-full ${height} bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden`}>
            <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${clamped}%`, background: barColor }}
            />
        </div>
    );
};
