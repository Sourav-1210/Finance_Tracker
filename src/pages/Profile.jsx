import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navbar } from '../components/Navbar';
import { FloatingShapes } from '../components/FloatingShapes';
import { auth } from '../firebase/config';
import { updateProfile } from 'firebase/auth';
import { HiUser, HiMail, HiCalendar, HiCheckCircle } from 'react-icons/hi';

export const Profile = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            await updateProfile(auth.currentUser, {
                displayName: displayName,
            });
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setIsEditing(false);
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setLoading(false);
        }
    };

    const createdAt = user?.metadata?.creationTime
        ? new Date(user.metadata.creationTime).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
        : 'N/A';

    const lastSignIn = user?.metadata?.lastSignInTime
        ? new Date(user.metadata.lastSignInTime).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
        : 'N/A';

    return (
        <div className="min-h-screen relative">
            <FloatingShapes />
            <Navbar />

            <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
                <h1 className="text-4xl font-bold text-gradient heading-glow mb-8">My Profile</h1>

                
                <div className="glass-card p-8 rounded-2xl mb-6">
                    
                    <div className="flex flex-col md:flex-row items-center gap-6 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                        
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-5xl font-bold shadow-glow-green">
                            {user?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
                        </div>

                        
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                {user?.displayName || 'User'}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-3">{user?.email}</p>
                            {user?.emailVerified && (
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold">
                                    <HiCheckCircle />
                                    <span>Verified Account</span>
                                </div>
                            )}
                        </div>
                    </div>

                    
                    {message.text && (
                        <div
                            className={`mb-6 p-4 rounded-xl ${message.type === 'success'
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                                }`}
                        >
                            {message.text}
                        </div>
                    )}

                    
                    {isEditing ? (
                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Display Name
                                </label>
                                <input
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    placeholder="Enter your name"
                                    className="input-fintech"
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-primary flex-1 disabled:opacity-50"
                                >
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setDisplayName(user?.displayName || '');
                                        setMessage({ type: '', text: '' });
                                    }}
                                    className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 font-semibold"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="btn-primary w-full md:w-auto"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>

                
                <div className="glass-card p-8 rounded-2xl">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Account Information
                    </h3>

                    <div className="space-y-4">
                        
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <HiMail className="text-2xl" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                                <p className="font-semibold text-gray-900 dark:text-white">{user?.email}</p>
                            </div>
                        </div>

                        
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                <HiUser className="text-2xl" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Display Name</p>
                                <p className="font-semibold text-gray-900 dark:text-white">
                                    {user?.displayName || 'Not set'}
                                </p>
                            </div>
                        </div>

                        
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                            <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                                <HiCalendar className="text-2xl" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                                <p className="font-semibold text-gray-900 dark:text-white">{createdAt}</p>
                            </div>
                        </div>

                        
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                <HiCalendar className="text-2xl" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Last Sign In</p>
                                <p className="font-semibold text-gray-900 dark:text-white">{lastSignIn}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
