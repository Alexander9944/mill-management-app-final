'use client';

import { useState, useEffect } from 'react';
import { stock } from '@/lib/api';
import StockCard from './StockCard';
import AddStockModal from './AddStockModal';
import StockHistoryTable from './StockHistoryTable';
import NotificationBanner from './NotificationBanner';

export default function Dashboard() {
    const [stocks, setStocks] = useState([]);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedStock, setSelectedStock] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        fetchStocks();
        fetchHistory();
    }, [refreshTrigger]);

    const fetchStocks = async () => {
        try {
            const response = await stock.getAll();
            setStocks(response.data);
        } catch (err) {
            console.error('Failed to fetch stocks:', err);
        }
    };

    const fetchHistory = async () => {
        try {
            const response = await stock.getHistory();
            setHistory(response.data);
        } catch (err) {
            console.error('Failed to fetch history:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleStockSubmit = async (stockId, quantity, remarks, type, transactionId = null) => {
        try {
            if (transactionId) {
                await stock.updateTransaction(transactionId, quantity, remarks);
            } else {
                await stock.update(stockId, type, quantity, remarks);
            }
            setRefreshTrigger(prev => prev + 1);
            setShowAddModal(false);
            setSelectedStock(null);
            setIsEditMode(false);
        } catch (err) {
            alert(err.response?.data?.msg || 'Operation failed');
        }
    };

    const handleHistoryEdit = (item) => {
        setSelectedStock(item);
        setIsEditMode(true);
        setShowAddModal(true);
    };

    const handleHistoryDelete = async (id) => {
        if (!confirm('Revert this transaction and adjust stock?')) return;
        try {
            await stock.deleteTransaction(id);
            setRefreshTrigger(prev => prev + 1);
        } catch (err) {
            alert('Failed to delete transaction');
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh]">
                <div className="w-16 h-16 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin mb-6"></div>
                <div className="text-sm font-black text-text-secondary animate-pulse tracking-widest uppercase">System Initialization...</div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-8 min-h-[calc(100vh-60px)]">
            <NotificationBanner />

            {/* Header Section Area Area */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 animate-fade-in px-2">
                <div>
                    <h1 className="text-4xl font-black text-text-primary tracking-tight mb-2">
                        Inventory <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-pink-500">Analytics</span>
                    </h1>
                    <p className="text-sm text-text-secondary font-black tracking-widest uppercase opacity-80">Real-time Command Center</p>
                </div>
                <div className="flex gap-4 w-full sm:w-auto">
                    <button
                        onClick={() => window.location.href = '/dashboard/accounts'}
                        className="flex-1 sm:flex-none glass border border-violet-500/30 text-violet-600 hover:bg-violet-500/10 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-2xl"
                    >
                        <span>💰</span> Financial Vault
                    </button>
                </div>
            </div>

            {/* Stock Cards Grid Area Area */}
            <div className="mb-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {stocks.map((s, idx) => (
                        <div key={s._id} style={{ animationDelay: `${idx * 50}ms` }} className="animate-fade-in">
                            <StockCard
                                stock={s}
                                onAddClick={() => {
                                    setSelectedStock({ ...s, type: 'add' });
                                    setIsEditMode(false);
                                    setShowAddModal(true);
                                }}
                                onRemoveClick={() => {
                                    setSelectedStock({ ...s, type: 'remove' });
                                    setIsEditMode(false);
                                    setShowAddModal(true);
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* History Section Area Area - Shrinked */}
            <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                <div className="flex items-center gap-6 mb-8">
                    <h2 className="text-xl font-black text-text-primary uppercase tracking-[0.2em] whitespace-nowrap">Movement Logs</h2>
                    <div className="h-0.5 flex-1 bg-border-color opacity-30"></div>
                </div>
                <div className="glass rounded-3xl overflow-hidden shadow-2xl border border-border-color">
                    <div className="h-[600px] overflow-y-auto scrollbar-thin">
                        <StockHistoryTable
                            history={history}
                            onEdit={handleHistoryEdit}
                            onDelete={handleHistoryDelete}
                        />
                    </div>
                </div>
            </div>

            {showAddModal && selectedStock && (
                <AddStockModal
                    stock={selectedStock}
                    isEdit={isEditMode}
                    onClose={() => {
                        setShowAddModal(false);
                        setSelectedStock(null);
                        setIsEditMode(false);
                    }}
                    onSubmit={handleStockSubmit}
                />
            )}
        </div>
    );
}
