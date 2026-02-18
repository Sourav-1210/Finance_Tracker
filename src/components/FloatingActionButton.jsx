import { HiPlus } from 'react-icons/hi';

export const FloatingActionButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 rounded-full shadow-lg hover:shadow-glow-green transform hover:scale-110 transition-all duration-300 flex items-center justify-center text-white z-40 animate-pulse-slow"
            aria-label="Add transaction"
        >
            <HiPlus className="text-3xl" />
        </button>
    );
};
