export const LoadingSkeleton = () => {
    return (
        <div className="relative glass-card p-4 rounded-xl overflow-hidden animate-pulse">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-gray-300 dark:bg-[#111827] rounded-xl"></div>
                    <div className="flex-1 space-y-2 min-w-0">
                        <div className="h-5 bg-gray-300 dark:bg-[#111827] rounded w-3/4"></div>
                        <div className="h-4 bg-gray-300 dark:bg-[#111827] rounded w-1/2"></div>
                    </div>
                </div>
                <div className="h-6 w-24 bg-gray-300 dark:bg-[#111827] rounded"></div>
            </div>

            {/* Shimmer Effect */}
            <div className="pointer-events-none absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent"></div>
        </div>
    );
};
