import { Navbar } from '../components/Navbar';
import { FloatingShapes } from '../components/FloatingShapes';
import { TrendLineChart } from '../components/TrendLineChart';
import { TopCategoriesCard } from '../components/TopCategoriesCard';
import { FinancialHealthScore } from '../components/FinancialHealthScore';
import { InsightsCard } from '../components/InsightsCard';
import { MdAnalytics } from 'react-icons/md';

export const Analytics = () => {
    return (
        <div className="min-h-screen relative">
            <FloatingShapes />
            <Navbar />

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
                {/* Page Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-glow-green">
                            <MdAnalytics className="text-white text-2xl" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Financial Analytics
                        </h1>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 ml-15">
                        Deep insights into your spending patterns and financial health
                    </p>
                </div>

                {/* Insights Cards */}
                <div className="mb-8">
                    <InsightsCard />
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Left Column: Charts */}
                    <div className="lg:col-span-2">
                        <TrendLineChart />
                    </div>

                    {/* Right Column: Financial Health */}
                    <div className="lg:col-span-1">
                        <FinancialHealthScore />
                    </div>
                </div>

                {/* Top Categories Section */}
                <div className="mb-8">
                    <TopCategoriesCard />
                </div>
            </main>
        </div>
    );
};
