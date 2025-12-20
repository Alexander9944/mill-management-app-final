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
        <header className="sticky top-0 z-50 glass border-b-2 border-border-color">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-tr from-indigo-700 to-violet-700 rounded-xl flex items-center justify-center shadow-2xl transform rotate-3 border-2 border-white/20">
                        <span className="text-white font-black text-xl italic leading-none">OM</span>
                    </div>
                    <h1 className="text-2xl font-black text-text-primary hidden sm:block tracking-tighter uppercase whitespace-nowrap">
                        Oil Mill <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Enterprise</span>
                    </h1>
                </div>

                <div className="flex items-center gap-8">
                    <ThemeToggle />
                    {user && (
                        <>
                            <div className="hidden md:flex flex-col items-end leading-none">
                                <span className="text-[10px] text-text-secondary uppercase tracking-[0.2em] font-black mb-1">Authenticated</span>
                                <span className="text-base font-black text-text-primary tracking-tight">{user.username}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-black rounded-2xl transition-all duration-300 flex items-center gap-3 text-xs uppercase tracking-widest shadow-xl transform active:scale-95"
                            >
                                <span className="hidden sm:inline">Logout</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 16l4-4m0 0l-4-4m4 4H7" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
