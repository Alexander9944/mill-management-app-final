'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';
import ThemeToggle from './ThemeToggle';

export default function Header() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <header className="sticky top-0 z-50 glass border-b border-border-color">
            <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-tr from-violet-600 to-pink-600 rounded-lg flex items-center justify-center shadow-lg transform rotate-3">
                        <span className="text-white font-black text-lg italic leading-none">OM</span>
                    </div>
                    <h1 className="text-lg font-bold text-text-primary hidden sm:block tracking-tight">
                        Oil Mill Management
                    </h1>
                </div>

                <div className="flex items-center gap-3 sm:gap-6">
                    <ThemeToggle />
                    {user && (
                        <>
                            <div className="hidden md:flex flex-col items-end leading-tight">
                                <span className="text-[9px] text-text-secondary uppercase tracking-widest font-black">System Ready</span>
                                <span className="text-xs font-bold text-text-primary tracking-tight">{user.username}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 font-bold rounded-lg transition-all duration-300 flex items-center gap-2 text-[10px] uppercase tracking-wider"
                            >
                                <span className="hidden sm:inline">Terminate</span>
                                <span className="sm:hidden">Exit</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
