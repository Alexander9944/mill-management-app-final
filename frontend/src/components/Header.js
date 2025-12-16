'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';

export default function Header() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <header className="bg-white shadow">
            <div className="max-w-full mx-auto px-6 py-4 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Oil Mill Management</h1>
                </div>
                <div className="flex items-center gap-4">
                    {user && (
                        <>
                            <span className="text-gray-600">Welcome, <span className="font-semibold">{user.username}</span></span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
