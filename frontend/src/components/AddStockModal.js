'use client';

import { useState } from 'react';

export default function AddStockModal({ stock, onClose, onSubmit }) {
    const [quantity, setQuantity] = useState('');
    const [remarks, setRemarks] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(stock._id, quantity, remarks, stock.type);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="glass rounded-2xl shadow-2xl w-full max-w-[340px] overflow-hidden border border-border-color">
                <div className={`p-4 text-white flex justify-between items-center border-b border-white/10 bg-gradient-to-r ${stock.type === 'add' ? 'from-emerald-600/30 to-teal-600/20' : 'from-red-600/30 to-orange-600/20'}`}>
                    <div>
                        <h2 className="text-xl font-black tracking-tight">{stock.type === 'add' ? 'Restock' : 'Dispatch'}</h2>
                        <p className="text-[9px] font-bold opacity-70 uppercase tracking-widest">{stock.name}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-all text-xl font-light">&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-[9px] font-black text-text-secondary uppercase tracking-widest mb-1.5 ml-1">Volume ({stock.unit})</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="w-full bg-input-bg border border-border-color rounded-xl px-4 py-3 text-input-text text-lg font-black focus:ring-1 focus:ring-violet-500 outline-none transition-all"
                            placeholder="0"
                            required
                            autoFocus
                        />
                    </div>

                    <div>
                        <label className="block text-[9px] font-black text-text-secondary uppercase tracking-widest mb-1.5 ml-1">Notes</label>
                        <textarea
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            className="w-full bg-input-bg border border-border-color rounded-xl px-4 py-2 text-input-text text-sm focus:ring-1 focus:ring-violet-500 outline-none transition-all h-16 resize-none"
                            placeholder="Optional..."
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className={`w-full py-3 rounded-xl text-white font-black tracking-widest uppercase text-[10px] shadow-lg transition-all active:scale-95 ${stock.type === 'add'
                                    ? 'bg-emerald-600 hover:bg-emerald-500'
                                    : 'bg-red-600 hover:bg-red-500'
                                }`}
                        >
                            Confirm {stock.type === 'add' ? 'Increment' : 'Decrement'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
