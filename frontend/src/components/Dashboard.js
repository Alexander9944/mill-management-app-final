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

    const handleAddStock = async (stockId, quantity, remarks, type) => {
        try {
            await stock.update(stockId, type, quantity, remarks);
            setRefreshTrigger(prev => prev + 1);
            setShowAddModal(false);
            setSelectedStock(null);
        } catch (err) {
            alert(err.response?.data?.msg || 'Failed to update stock');
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh]">
                <div className="w-10 h-10 border-2 border-violet-500/20 border-t-violet-500 rounded-full animate-spin mb-3"></div>
                <div className="text-[10px] font-black text-text-secondary animate-pulse tracking-widest uppercase">Syncing...</div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-4 min-h-[calc(100vh-60px)]">
            <NotificationBanner />

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 animate-fade-in px-1">
                <div>
                    <h1 className="text-2xl font-black text-text-primary tracking-tight">
                        Inventory <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-pink-500">Analytics</span>
                    </h1>
                    <p className="text-[10px] text-text-secondary font-medium">Real-time monitoring of Oil Mill operations.</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <button
                        onClick={() => window.location.href = '/dashboard/accounts'}
                        className="flex-1 sm:flex-none glass border-violet-500/20 text-violet-500 hover:bg-violet-500/10 px-4 py-2 rounded-xl font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-md"
                    >
                        <span>💰</span> Money Management
                    </button>
                </div>
            </div>

            {/* Initialize Button */}
            {stocks.length === 0 && (
                <div className="mb-8 glass p-6 rounded-2xl border border-blue-500/20 text-center animate-fade-in">
                    <h3 className="text-sm font-bold text-text-primary mb-2">No Data</h3>
                    <button
                        onClick={async () => {
                            const categories = [
                                { name: 'White Oil', unit: 'Liters' },
                                { name: 'Second Quality Oil', unit: 'Liters' },
                                { name: 'Lamp Oil', unit: 'Liters' },
                                { name: 'Punnaku', unit: 'Kg' },
                                { name: 'Diesel', unit: 'Liters' },
                            ];
                            for (const cat of categories) {
                                try { await stock.create(cat.name, cat.unit, `Initial ${cat.name} stock`); } catch (e) { }
                            }
                            setRefreshTrigger(prev => prev + 1);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl text-xs transition-all"
                    >
                        Initialize Categories
                    </button>
                </div>
            )}

            {/* Stock Cards Grid - Compact */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mb-8">
                {stocks.map((s, idx) => (
                    <div key={s._id} style={{ animationDelay: `${idx * 50}ms` }} className="animate-fade-in">
                        <StockCard
                            stock={s}
                            onAddClick={() => {
                                setSelectedStock({ ...s, type: 'add' });
                                setShowAddModal(true);
                            }}
                            onRemoveClick={() => {
                                setSelectedStock({ ...s, type: 'remove' });
                                setShowAddModal(true);
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* History Section - Shrinked */}
            <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                <div className="flex items-center gap-3 mb-3">
                    <h2 className="text-sm font-black text-text-primary uppercase tracking-widest">Logs</h2>
                    <div className="h-px flex-1 bg-border-color"></div>
                </div>
                <div className="glass rounded-2xl overflow-hidden shadow-lg border border-border-color">
                    <StockHistoryTable history={history} />
                </div>
            </div>

            {showAddModal && selectedStock && (
                <AddStockModal
                    stock={selectedStock}
                    onClose={() => {
                        setShowAddModal(false);
                        setSelectedStock(null);
                    }}
                    onSubmit={handleAddStock}
                />
            )}
        </div>
    );
}
