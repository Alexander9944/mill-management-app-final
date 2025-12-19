'use client';

import { useState, useEffect } from 'react';
import { accounts } from '@/lib/api';
import TransactionTable from './TransactionTable';
import SummaryCards from './SummaryCards';
import AddTransactionModal from './AddTransactionModal';
import TodoList from './TodoList';

const CREDIT_CATEGORIES = ['White Oil', 'Second Quality Oil', 'Lamp Oil', 'Punnaku'];
const DEBIT_CATEGORIES = [
    'Diesel',
    'Kopra from Murugandy',
    'Kopra from Vatrapillai',
    'MDC Kopra',
    'Current Bill',
    'Transport',
    'Bike Petrol',
    'Diesel (Vehicle/Gen)',
    'Wages'
];

export default function AccountsDashboard() {
    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState({ credit: 0, debit: 0, balance: 0 });
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('credit');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [transRes, summaryRes] = await Promise.all([
                accounts.getTransactions(),
                accounts.getSummary()
            ]);
            setTransactions(transRes.data);
            setSummary(summaryRes.data);
        } catch (err) {
            console.error('Failed to fetch account data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTransaction = async (data) => {
        try {
            await accounts.create(data);
            fetchData();
            setShowModal(false);
        } catch (err) {
            alert(err.response?.data?.msg || 'Failed to add transaction');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this transaction?')) return;
        try {
            await accounts.delete(id);
            fetchData();
        } catch (err) {
            alert('Failed to delete transaction');
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh]">
                <div className="w-10 h-10 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-3"></div>
                <div className="text-[10px] font-black text-text-secondary animate-pulse tracking-widest uppercase">Syncing...</div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-4 bg-background min-h-[calc(100vh-60px)]">
            {/* Header Area Area */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 animate-fade-in">
                <div className="flex-1">
                    <button
                        onClick={() => window.location.href = '/dashboard'}
                        className="group flex items-center gap-1.5 text-violet-500 hover:text-violet-400 font-bold mb-2 transition-all"
                    >
                        <span className="text-xs group-hover:-translate-x-1 transition-transform">&larr;</span>
                        <span className="text-[9px] uppercase tracking-widest leading-none">Inventory</span>
                    </button>
                    <h1 className="text-2xl font-black text-text-primary tracking-tight">
                        Financial <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Vault</span>
                    </h1>
                    <p className="text-[10px] text-text-secondary font-medium italic">Ledger for sales and expenditures.</p>
                </div>
                <SummaryCards summary={summary} />
            </div>

            {/* Main Content Grid Area */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                {/* Left Area: Transaction Actions & History Area */}
                <div className="lg:col-span-3 space-y-6 animate-fade-in">
                    <div className="flex gap-3">
                        <button
                            onClick={() => { setModalType('credit'); setShowModal(true); }}
                            className="group relative flex-1 p-[1px] rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 transition-all duration-300 transform hover:scale-[1.01] shadow-md shadow-emerald-500/10"
                        >
                            <div className="bg-background group-hover:bg-transparent transition-colors rounded-[11px] p-4 flex flex-col items-center gap-1">
                                <span className="text-xl">💰</span>
                                <span className="text-emerald-500 group-hover:text-white text-[10px] font-black uppercase tracking-tighter">Add Credit</span>
                            </div>
                        </button>

                        <button
                            onClick={() => { setModalType('debit'); setShowModal(true); }}
                            className="group relative flex-1 p-[1px] rounded-xl bg-gradient-to-br from-red-500 to-orange-600 hover:from-red-400 hover:to-orange-500 transition-all duration-300 transform hover:scale-[1.01] shadow-md shadow-red-500/10"
                        >
                            <div className="bg-background group-hover:bg-transparent transition-colors rounded-[11px] p-4 flex flex-col items-center gap-1">
                                <span className="text-xl">🧾</span>
                                <span className="text-red-500 group-hover:text-white text-[10px] font-black uppercase tracking-tighter">Add Debit</span>
                            </div>
                        </button>
                    </div>

                    <div className="glass rounded-2xl overflow-hidden shadow-lg border border-border-color">
                        <div className="px-4 py-3 border-b border-border-color flex justify-between items-center bg-white/5">
                            <h2 className="text-xs font-black text-text-primary uppercase tracking-widest">Transactions</h2>
                        </div>
                        <div className="max-h-[400px] overflow-y-auto scrollbar-thin">
                            <TransactionTable transactions={transactions} onDelete={handleDelete} />
                        </div>
                    </div>
                </div>

                {/* Right Area: Todo List Area */}
                <div className="lg:col-span-1 animate-fade-in">
                    <TodoList />
                </div>
            </div>

            {showModal && (
                <AddTransactionModal
                    type={modalType}
                    categories={modalType === 'credit' ? CREDIT_CATEGORIES : DEBIT_CATEGORIES}
                    onClose={() => setShowModal(false)}
                    onSubmit={handleAddTransaction}
                />
            )}
        </div>
    );
}
