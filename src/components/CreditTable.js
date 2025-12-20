'use client';

import { FaEdit, FaTrash, FaCheckCircle, FaRegCircle } from 'react-icons/fa';

export default function CreditTable({ records, onEdit, onDelete, onStatusToggle }) {
    return (
        <div className="glass rounded-2xl overflow-hidden shadow-xl border border-white/10 animate-fade-in">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/5 border-b border-white/10">
                            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-text-secondary">Status</th>
                            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-text-secondary">Shop Name</th>
                            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-text-secondary text-right">Total</th>
                            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-text-secondary text-right">Paid</th>
                            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-text-secondary text-right">Remaining</th>
                            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-text-secondary">Due Date</th>
                            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-text-secondary text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {records.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="p-12 text-center text-text-secondary font-black italic opacity-50">
                                    No credit records found. All payments are clear! 🥂
                                </td>
                            </tr>
                        ) : (
                            records.map((record) => (
                                <tr key={record._id} className={`hover:bg-white/5 transition-colors group ${record.status === 'completed' ? 'opacity-50' : ''}`}>
                                    <td className="p-4 whitespace-nowrap">
                                        <button
                                            onClick={() => onStatusToggle(record._id, record.status === 'completed' ? 'pending' : 'completed')}
                                            className={`text-xl transition-all ${record.status === 'completed' ? 'text-green-500 hover:text-green-400' : 'text-text-secondary hover:text-amber-500 scale-110'}`}
                                        >
                                            {record.status === 'completed' ? <FaCheckCircle /> : <FaRegCircle />}
                                        </button>
                                    </td>
                                    <td className="p-4 whitespace-nowrap">
                                        <div className="font-black text-text-primary">{record.shopName}</div>
                                        <div className="text-[10px] text-text-secondary font-bold">{record.notes}</div>
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-right text-text-primary font-black">
                                        ₹{record.totalAmount.toLocaleString()}
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-right text-green-500 font-black">
                                        ₹{record.amountPaid.toLocaleString()}
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-right">
                                        <span className={`px-2 py-1 rounded-lg font-black text-xs ${record.remainingAmount > 0 ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                                            ₹{record.remainingAmount.toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-text-secondary font-bold text-xs">
                                        {record.dueDate ? new Date(record.dueDate).toLocaleDateString() : 'No Date'}
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => onEdit(record)}
                                                className="p-2 text-blue-500 hover:bg-blue-500/20 rounded-xl transition-all"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => onDelete(record._id)}
                                                className="p-2 text-red-500 hover:bg-red-500/20 rounded-xl transition-all"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
