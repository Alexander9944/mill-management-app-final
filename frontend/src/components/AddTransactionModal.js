'use client';

import { useState, useEffect } from 'react';

export default function AddTransactionModal({ type, categories, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        category: categories[0],
        quantity: '',
        pricePerUnit: '',
        amount: '',
        remarks: '',
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        if (type === 'credit' && formData.quantity && formData.pricePerUnit) {
            setFormData(prev => ({
                ...prev,
                amount: (Number(formData.quantity) * Number(formData.pricePerUnit)).toString()
            }));
        }
    }, [formData.quantity, formData.pricePerUnit, type]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            type,
            quantity: formData.quantity ? Number(formData.quantity) : null,
            pricePerUnit: formData.pricePerUnit ? Number(formData.pricePerUnit) : null,
            amount: Number(formData.amount)
        });
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="glass rounded-2xl shadow-2xl w-full max-w-[360px] overflow-hidden border border-border-color">
                <div className={`p-4 text-white flex justify-between items-center border-b border-white/10 bg-gradient-to-r ${type === 'credit' ? 'from-emerald-600/30 to-teal-600/20' : 'from-red-600/30 to-orange-600/20'}`}>
                    <div>
                        <h2 className="text-xl font-black tracking-tight">{type === 'credit' ? 'Income' : 'Expense'}</h2>
                        <p className="text-[9px] font-bold opacity-70 uppercase tracking-widest">Authorized Entry</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-all text-xl font-light">&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2 sm:col-span-1">
                            <label className="block text-[8px] font-black text-text-secondary uppercase tracking-widest mb-1 ml-1">Type</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full bg-input-bg border border-border-color rounded-xl px-3 py-2 text-input-text text-xs focus:ring-1 focus:ring-violet-500 outline-none transition-all"
                                required
                            >
                                {categories.map(cat => <option key={cat} value={cat} className="bg-background">{cat}</option>)}
                            </select>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label className="block text-[8px] font-black text-text-secondary uppercase tracking-widest mb-1 ml-1">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full bg-input-bg border border-border-color rounded-xl px-3 py-2 text-input-text text-xs focus:ring-1 focus:ring-violet-500 outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    {type === 'credit' && (
                        <div className="grid grid-cols-2 gap-3 animate-fade-in">
                            <div>
                                <label className="block text-[8px] font-black text-text-secondary uppercase tracking-widest mb-1 ml-1">Qty</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    className="w-full bg-input-bg border border-border-color rounded-xl px-3 py-2 text-input-text text-xs focus:ring-1 focus:ring-violet-500 outline-none transition-all"
                                    placeholder="0"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[8px] font-black text-text-secondary uppercase tracking-widest mb-1 ml-1">Price</label>
                                <input
                                    type="number"
                                    name="pricePerUnit"
                                    value={formData.pricePerUnit}
                                    onChange={handleChange}
                                    className="w-full bg-input-bg border border-border-color rounded-xl px-3 py-2 text-input-text text-xs focus:ring-1 focus:ring-violet-500 outline-none transition-all"
                                    placeholder="0.00"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-[8px] font-black text-text-secondary uppercase tracking-widest mb-1 ml-1">Amount</label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className={`w-full bg-input-bg border border-border-color rounded-xl px-4 py-3 text-xl font-black focus:ring-1 focus:ring-violet-500 outline-none transition-all tabular-nums ${type === 'credit' ? 'text-emerald-600' : 'text-red-500'}`}
                            placeholder="0.00"
                            readOnly={type === 'credit'}
                            required
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className={`w-full py-3 rounded-xl text-white font-black tracking-widest uppercase text-[10px] shadow-lg transition-all active:scale-95 ${type === 'credit'
                                    ? 'bg-emerald-600 hover:bg-emerald-500'
                                    : 'bg-red-600 hover:bg-red-500'
                                }`}
                        >
                            Log {type === 'credit' ? 'Sale' : 'Expense'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
