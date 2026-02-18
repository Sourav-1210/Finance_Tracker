export const FloatingShapes = () => {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            <div
                className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-primary-400/10 to-primary-500/10 rounded-full blur-3xl animate-float"
            ></div>
            <div
                className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-accent-400/10 to-accent-500/10 rounded-full blur-3xl animate-float"
                style={{ animationDelay: '2s' }}
            ></div>
            <div
                className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-secondary-400/10 to-secondary-500/10 rounded-full blur-3xl animate-float"
                style={{ animationDelay: '4s' }}
            ></div>
        </div>
    );
};
