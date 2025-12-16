'use client';

import { useState } from 'react';

export default function AddStockModal({ stock, onClose, onSubmit }) {
    const [quantity, setQuantity] = useState('');
    const [remarks, setRemarks] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!quantity || parseFloat(quantity) <= 0) {
            setError('Please enter a valid quantity');
            return;
        }

        setLoading(true);
        try {
            await onSubmit(stock._id, parseFloat(quantity), remarks, stock.type);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {stock.type === 'add' ? 'Add Stock' : 'Remove Stock'}
                </h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Stock Item
                        </label>
                        <p className="text-gray-800 font-semibold">{stock.name}</p>
                        <p className="text-sm text-gray-600">Current: {stock.quantity} {stock.unit}</p>
                    </div>

                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                            Quantity ({stock.unit}) *
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            step="0.01"
                            min="0"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label htmlFor="remarks" className="block text-sm font-medium text-gray-700 mb-1">
                            Remarks (optional)
                        </label>
                        <textarea
                            id="remarks"
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                            rows="3"
                            disabled={loading}
                        />
                    </div>

                    <div className="flex gap-2 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded transition duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`flex-1 font-bold py-2 px-4 rounded transition duration-200 text-white ${stock.type === 'add'
                                ? 'bg-green-600 hover:bg-green-700 disabled:bg-gray-400'
                                : 'bg-red-600 hover:bg-red-700 disabled:bg-gray-400'
                                }`}
                        >
                            {loading ? 'Processing...' : stock.type === 'add' ? 'Add Stock' : 'Remove Stock'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
