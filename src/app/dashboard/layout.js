'use client';

import { useEffect } from 'react';
import { useAuth } from '@/lib/useAuth';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';

export default function ProtectedLayout({ children }) {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, loading, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-2xl font-bold text-gray-800">Loading...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div>
            <Header />
            {children}
        </div>
    );
}
