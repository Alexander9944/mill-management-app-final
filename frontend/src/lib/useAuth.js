import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from './api';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                try {
                    const response = await auth.getCurrentUser();
                    setUser(response.data);
                } catch (err) {
                    localStorage.removeItem('authToken');
                    router.push('/login');
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, [router]);

    const login = async (username, password) => {
        const response = await auth.login(username, password);
        localStorage.setItem('authToken', response.data.token);
        setUser(response.data.user);
        return response.data;
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
        router.push('/login');
    };

    return { user, loading, login, logout, isAuthenticated: !!user };
};
