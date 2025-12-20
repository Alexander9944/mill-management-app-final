'use client';

import { useState, useEffect } from 'react';

export default function AddCreditModal({ isOpen, onClose, onSubmit, initialData }) {
    const [formData, setFormData] = useState({
        shopName: '',
        totalAmount: '',
        amountPaid: '',
        notes: '',
        dueDate: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                shopName: initialData.shopName || '',
                totalAmount: initialData.totalAmount || '',
                amountPaid: initialData.amountPaid || '',
                notes: initialData.notes || '',
                dueDate: initialData.dueDate ? initialData.dueDate.split('T')[0] : ''
            });
        } else {
            setFormData({
                shopName: '',
                totalAmount: '',
                amountPaid: '',
                notes: '',
                dueDate: ''
            });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData, initialData?._id);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="glass rounded-3xl w-full max-w-md p-8 shadow-2xl border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500"></div>

                <h2 className="text-2xl font-black text-text-primary mb-6 flex items-center gap-3">
                    <span className="text-3xl">📝</span>
                    {initialData ? 'Update Credit Entry' : 'New Credit Entry'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-[10px] font-black text-text-secondary uppercase tracking-widest mb-2 ml-1">Shop Name</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g., Star Supermarket"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-text-primary focus:border-amber-500 outline-none transition-all font-black text-sm"
                            value={formData.shopName}
                            onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-black text-text-secondary uppercase tracking-widest mb-2 ml-1">Total Amount</label>
                            <input
                                type="number"
                                required
                                placeholder="10000"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-text-primary focus:border-amber-500 outline-none transition-all font-black text-sm"
                                value={formData.totalAmount}
                                onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-text-secondary uppercase tracking-widest mb-2 ml-1">Amount Paid</label>
                            <input
                                type="number"
                                required
                                placeholder="5000"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-text-primary focus:border-amber-500 outline-none transition-all font-black text-sm"
                                value={formData.amountPaid}
                                onChange={(e) => setFormData({ ...formData, amountPaid: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-black text-text-secondary uppercase tracking-widest mb-2 ml-1">Expected Payment Date</label>
                        <input
                            type="date"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-text-primary focus:border-amber-500 outline-none transition-all font-black text-sm"
                            value={formData.dueDate}
                            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-black text-text-secondary uppercase tracking-widest mb-2 ml-1">Notes</label>
                        <textarea
                            placeholder="Any details about the transaction..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-text-primary focus:border-amber-500 outline-none transition-all font-black text-sm h-24 resize-none"
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        ></textarea>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-white/5 hover:bg-white/10 text-text-primary py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-amber-500/20"
                        >
                            {initialData ? 'Save Changes' : 'Record Credit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
