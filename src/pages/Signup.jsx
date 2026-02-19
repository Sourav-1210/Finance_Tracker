import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUpWithEmail, signInWithGoogle } from '../firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { HiMail, HiLockClosed, HiUser } from 'react-icons/hi';
import { AiFillDollarCircle } from 'react-icons/ai';

export const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailSignup = async (e) => {
        e.preventDefault();
        setError('');

        
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        const { user, error: authError } = await signUpWithEmail(email, password);

        if (authError) {
            setError(authError);
            setLoading(false);
        } else if (user) {
            navigate('/dashboard');
        }
    };

    const handleGoogleSignup = async () => {
        setError('');
        setLoading(true);

        const { user, error: authError } = await signInWithGoogle();

        if (authError) {
            setError(authError);
            setLoading(false);
        } else if (user) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden animate-fade-in">
            
            <div className="absolute top-20 right-10 w-72 h-72 bg-accent-400/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 right-1/2 w-80 h-80 bg-primary-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>

            
            <div className="glass-card max-w-md w-full p-8 md:p-10 rounded-2xl shadow-glass-lg animate-slide-up relative z-10">
                
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl mb-4 shadow-glow-purple">
                        <AiFillDollarCircle className="text-white text-3xl" />
                    </div>
                    <h1 className="text-3xl font-bold text-gradient mb-2">
                        Create Account
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Start managing your finances today
                    </p>
                </div>

                
                {error && (
                    <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-xl text-red-700 dark:text-red-400 text-sm animate-slide-down">
                        {error}
                    </div>
                )}

                
                <form onSubmit={handleEmailSignup} className="space-y-5">
                    
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <HiMail className="text-xl" />
                        </div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address"
                            required
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-accent-500 focus:ring-4 focus:ring-accent-500/20 transition-all duration-300 outline-none"
                        />
                    </div>

                    
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <HiLockClosed className="text-xl" />
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password (min. 6 characters)"
                            required
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-accent-500 focus:ring-4 focus:ring-accent-500/20 transition-all duration-300 outline-none"
                        />
                    </div>

                    
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <HiLockClosed className="text-xl" />
                        </div>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm password"
                            required
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-accent-500 focus:ring-4 focus:ring-accent-500/20 transition-all duration-300 outline-none"
                        />
                    </div>

                    
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-secondary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white/70 dark:bg-gray-800/70 text-gray-500">
                            Or continue with
                        </span>
                    </div>
                </div>

                
                <button
                    onClick={handleGoogleSignup}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:border-accent-500 hover:shadow-glass transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FcGoogle className="text-2xl" />
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                        Sign up with Google
                    </span>
                </button>

                
                <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="text-accent-600 dark:text-accent-400 font-semibold hover:underline"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};
