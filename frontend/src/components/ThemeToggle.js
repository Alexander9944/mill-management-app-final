'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const savedTheme = localStorage.getItem('app-theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('app-theme', newTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-3 glass rounded-xl hover:scale-110 active:scale-95 transition-all shadow-lg flex items-center justify-center group"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
            {theme === 'dark' ? (
                <span className="text-xl group-hover:rotate-12 transition-transform">☀️</span>
            ) : (
                <span className="text-xl group-hover:-rotate-12 transition-transform">🌙</span>
            )}
        </button>
    );
}
