'use client';

import { useState, useEffect } from 'react';
import { accounts } from '@/lib/api';
import TransactionTable from './TransactionTable';
import SummaryCards from './SummaryCards';
import AddTransactionModal from './AddTransactionModal';
import MonthlyReportChart from './MonthlyReportChart';
import TodoList from './TodoList';
import CreditTable from './CreditTable';
import AddCreditModal from './AddCreditModal';
import { credits } from '@/lib/api';

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
    const [summary, setSummary] = useState({ credit: 0, debit: 0, balance: 0, pendingCollection: 0 });
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showCreditModal, setShowCreditModal] = useState(false);
    const [modalType, setModalType] = useState('credit');
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [creditRecords, setCreditRecords] = useState([]);
    const [editingCredit, setEditingCredit] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [transRes, summaryRes, creditRes] = await Promise.all([
                accounts.getTransactions(),
                accounts.getSummary(),
                credits.getAll()
            ]);

            const pendingTotal = creditRes.data.reduce((acc, curr) =>
                curr.status === 'pending' ? acc + curr.remainingAmount : acc, 0);

            setTransactions(transRes.data);
            setSummary({ ...summaryRes.data, pendingCollection: pendingTotal });
            setCreditRecords(creditRes.data);
        } catch (err) {
            console.error('Failed to fetch account data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleTransactionSubmit = async (data, id) => {
        try {
            if (id) {
                await accounts.update(id, data);
            } else {
                await accounts.create(data);
            }
            fetchData();
            setShowModal(false);
            setEditingTransaction(null);
        } catch (err) {
            alert(err.response?.data?.msg || 'Operation failed');
        }
    };

    const handleEdit = (transaction) => {
        setEditingTransaction(transaction);
        setModalType(transaction.type);
        setShowModal(true);
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

    const handleCreditSubmit = async (data, id) => {
        try {
            if (id) {
                await credits.update(id, data);
            } else {
                await credits.create(data);
            }
            fetchData();
            setShowCreditModal(false);
            setEditingCredit(null);
        } catch (err) {
            alert(err.response?.data?.msg || 'Credit operation failed');
        }
    };

    const handleCreditDelete = async (id) => {
        if (!confirm('Delete this credit record?')) return;
        try {
            await credits.delete(id);
            fetchData();
        } catch (err) {
            alert('Failed to delete record');
        }
    };

    const handleCreditStatusToggle = async (id, status) => {
        try {
            await credits.update(id, { status });
            fetchData();
        } catch (err) {
            alert('Failed to update status');
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh]">
                <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
                <div className="text-sm font-black text-text-secondary animate-pulse tracking-widest uppercase">Syncing...</div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-8 bg-background min-h-[calc(100vh-60px)]">
            {/* Header Area */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10 animate-fade-in">
                <div className="flex-1">
                    <button
                        onClick={() => window.location.href = '/dashboard'}
                        className="glass border border-violet-500/30 text-violet-600 hover:bg-violet-500/10 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg mb-4 cursor-pointer"
                    >
                        <span className="text-sm">&larr;</span> Inventory
                    </button>
                    <h1 className="text-4xl font-black text-text-primary tracking-tight">
                        Financial <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Vault</span>
                    </h1>
                    <p className="text-sm text-text-secondary font-black italic">Comprehensive Ledger for All Transactions.</p>
                </div>
                <SummaryCards summary={summary} />
            </div>

            {/* Main Content Grid Area */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-10">
                {/* Left Side: Transactions Area */}
                <div className="lg:col-span-3 space-y-8 animate-fade-in">

                    <div className="flex gap-4">
                        <button
                            onClick={() => { setModalType('credit'); setEditingTransaction(null); setShowModal(true); }}
                            className="group relative flex-1 p-[2px] rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 transition-all duration-300 transform hover:scale-[1.02] shadow-xl"
                        >
                            <div className="bg-background group-hover:bg-transparent transition-colors rounded-[14px] p-6 flex flex-col items-center gap-2">
                                <span className="text-3xl">💰</span>
                                <span className="text-emerald-600 group-hover:text-white text-xs font-black uppercase tracking-tighter">Add Credit</span>
                            </div>
                        </button>

                        <button
                            onClick={() => { setModalType('debit'); setEditingTransaction(null); setShowModal(true); }}
                            className="group relative flex-1 p-[2px] rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 hover:from-red-400 hover:to-orange-500 transition-all duration-300 transform hover:scale-[1.02] shadow-xl"
                        >
                            <div className="bg-background group-hover:bg-transparent transition-colors rounded-[14px] p-6 flex flex-col items-center gap-2">
                                <span className="text-3xl">🧾</span>
                                <span className="text-red-600 group-hover:text-white text-xs font-black uppercase tracking-tighter">Add Debit</span>
                            </div>
                        </button>
                    </div>

                    <div className="glass rounded-3xl overflow-hidden shadow-2xl border-2 border-border-color">
                        <div className="px-6 py-4 border-b-2 border-border-color flex justify-between items-center bg-white/5">
                            <h2 className="text-sm font-black text-text-primary uppercase tracking-widest">Transaction History</h2>
                        </div>
                        <div className="h-[600px] overflow-y-auto scrollbar-thin">
                            <TransactionTable transactions={transactions} onDelete={handleDelete} onEdit={handleEdit} />
                        </div>
                    </div>

                    {/* Graph Section - Now at the end of the left column */}
                    <div className="mt-12">
                        <MonthlyReportChart transactions={transactions} />
                    </div>
                </div>

                {/* Right Side: Todo List Area */}
                <div className="lg:col-span-1 animate-fade-in space-y-8">
                    <button
                        onClick={() => { setEditingCredit(null); setShowCreditModal(true); }}
                        className="w-full glass p-6 rounded-2xl border-2 border-amber-500/30 hover:bg-amber-500/10 transition-all flex flex-col items-center gap-3 group shadow-xl"
                    >
                        <span className="text-4xl group-hover:scale-110 transition-transform">📝</span>
                        <div className="text-center">
                            <span className="block text-amber-600 text-xs font-black uppercase tracking-widest">Shop Credit</span>
                            <span className="block text-[10px] text-text-secondary font-bold">Track Pending Payments</span>
                        </div>
                    </button>

                    <TodoList />
                </div>
            </div>

            {/* Credit Records Section */}
            <div className="mt-12 animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-2xl font-black text-text-primary">Shop Payment <span className="text-amber-500">Tracker</span></h2>
                    <div className="h-[2px] flex-1 bg-gradient-to-r from-amber-500/50 to-transparent"></div>
                </div>
                <CreditTable
                    records={creditRecords}
                    onEdit={(record) => { setEditingCredit(record); setShowCreditModal(true); }}
                    onDelete={handleCreditDelete}
                    onStatusToggle={handleCreditStatusToggle}
                />
            </div>

            {showModal && (
                <AddTransactionModal
                    type={modalType}
                    categories={modalType === 'credit' ? CREDIT_CATEGORIES : DEBIT_CATEGORIES}
                    onClose={() => { setShowModal(false); setEditingTransaction(null); }}
                    onSubmit={handleTransactionSubmit}
                    initialData={editingTransaction}
                />
            )}

            {showCreditModal && (
                <AddCreditModal
                    isOpen={showCreditModal}
                    onClose={() => { setShowCreditModal(false); setEditingCredit(null); }}
                    onSubmit={handleCreditSubmit}
                    initialData={editingCredit}
                />
            )}
        </div>
    );
}
