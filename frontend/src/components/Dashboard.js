'use client';

import { useState, useEffect } from 'react';
import { stock } from '@/lib/api';
import StockCard from './StockCard';
import AddStockModal from './AddStockModal';
import StockHistoryTable from './StockHistoryTable';

const STOCK_CATEGORIES = [
    { name: 'White Oil', unit: 'Liters' },
    { name: 'Second Quality Oil', unit: 'Liters' },
    { name: 'Lamp Oil', unit: 'Liters' },
    { name: 'Kopra Stock', unit: 'Kg' },
    { name: 'Diesel', unit: 'Liters' },
];

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

    const initializeStocks = async () => {
        try {
            for (const category of STOCK_CATEGORIES) {
                try {
                    await stock.create(category.name, category.unit, `Initial ${category.name} stock`);
                } catch (err) {
                    // Stock might already exist
                }
            }
            setRefreshTrigger(prev => prev + 1);
        } catch (err) {
            console.error('Failed to initialize stocks:', err);
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

    const handleInitialize = async () => {
        if (stocks.length === 0) {
            await initializeStocks();
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-2xl font-bold text-gray-800">Loading...</div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Stock Management Dashboard</h1>
                <p className="text-gray-600">Manage your oil mill inventory</p>
            </div>

            {/* Initialize Button */}
            {stocks.length === 0 && (
                <div className="mb-6 p-4 bg-blue-100 border border-blue-400 rounded-lg">
                    <button
                        onClick={handleInitialize}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Initialize Stock Categories
                    </button>
                </div>
            )}

            {/* Stock Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {stocks.map((s) => (
                    <StockCard
                        key={s._id}
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
                ))}
            </div>

            {/* Stock History */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Stock Movement History</h2>
                <StockHistoryTable history={history} />
            </div>

            {/* Modal */}
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
