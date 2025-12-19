'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/api';
import ThemeToggle from '@/components/ThemeToggle';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await auth.login(username, password);
            localStorage.setItem('authToken', response.data.token);
            router.push('/dashboard');
        } catch (err) {
            setError(err.response?.data?.msg || 'Authentication Failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-background">
            <div className="absolute top-4 right-4 z-50">
                <ThemeToggle />
            </div>
            {/* Animated Background Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/10 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-600/10 blur-[100px] rounded-full"></div>

            <div className="w-full max-w-[320px] relative z-10 animate-fade-in">
                <div className="glass rounded-[2rem] p-8 shadow-2xl border-t border-white/10">
                    <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-tr from-violet-600 to-pink-600 rounded-xl flex items-center justify-center shadow-xl mx-auto mb-4 transform rotate-6">
                            <span className="text-white font-black text-2xl italic">OM</span>
                        </div>
                        <h1 className="text-2xl font-black text-text-primary tracking-tight mb-1">Central <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-pink-500">Access</span></h1>
                        <p className="text-[10px] text-text-secondary font-black uppercase tracking-widest">Enterprise Intelligence</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 text-red-500 px-3 py-2 rounded-xl text-[10px] font-bold text-center">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-[9px] font-black text-text-secondary uppercase tracking-widest mb-1.5 ml-1">Identity</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-input-bg border border-border-color rounded-xl px-4 py-3 text-input-text text-sm focus:ring-1 focus:ring-violet-500 outline-none transition-all placeholder:text-text-secondary/50"
                                placeholder="Username"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label className="block text-[9px] font-black text-text-secondary uppercase tracking-widest mb-1.5 ml-1">Access Token</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-input-bg border border-border-color rounded-xl px-4 py-3 text-input-text text-sm focus:ring-1 focus:ring-violet-500 outline-none transition-all placeholder:text-text-secondary/50"
                                placeholder="Password"
                                required
                                disabled={loading}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 py-3.5 rounded-xl text-white font-black tracking-widest uppercase text-[11px] shadow-lg transition-all active:scale-95 disabled:opacity-50"
                        >
                            {loading ? 'Decrypting...' : 'Establish Connection'}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-border-color">
                        <div className="flex justify-around text-[9px] font-bold text-text-secondary">
                            <p>USER: <span className="text-violet-500">admin</span></p>
                            <p>PASS: <span className="text-pink-500">admin123</span></p>
                        </div>
                    </div>
                </div>

                <p className="text-center text-text-secondary text-[8px] font-black uppercase tracking-[0.2em] mt-6 opacity-30">
                    &copy; 2025 Mill Intelligence
                </p>
            </div>
        </div>
    );
}
