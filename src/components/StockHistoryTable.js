'use client';

export default function StockHistoryTable({ history, onEdit, onDelete }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="overflow-x-auto p-4">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-white/[0.05] border-b border-border-color">
                        <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-black text-text-primary uppercase tracking-widest">Time</th>
                        <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-black text-text-primary uppercase tracking-widest">Movement Log</th>
                        <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-black text-text-primary uppercase tracking-widest text-right">Quantity</th>
                        <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-black text-text-primary uppercase tracking-widest text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border-color">
                    {history.map((item) => (
                        <tr key={item._id} className="group hover:bg-white/[0.05] transition-colors">
                            <td className="px-3 md:px-6 py-3 md:py-4 text-sm font-black text-text-primary font-mono">
                                {formatDate(item.date)}
                            </td>
                            <td className="px-3 md:px-6 py-3 md:py-4">
                                <span className="text-base font-black text-text-primary mr-3">{item.stockId?.name}</span>
                                <span className="text-xs text-text-secondary italic font-black truncate max-w-[250px] inline-block opacity-80">{item.remarks}</span>
                            </td>
                            <td className="px-3 md:px-6 py-3 md:py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <span className={`text-base font-black tabular-nums ${item.type === 'add' ? 'text-emerald-600' : 'text-red-500'}`}>
                                        {item.type === 'add' ? '+' : '-'}{item.quantity}
                                    </span>
                                    <span className="text-[10px] text-text-secondary font-black uppercase tracking-tighter">{item.stockId?.unit}</span>
                                </div>
                            </td>
                            <td className="px-3 md:px-6 py-3 md:py-4 text-center">
                                <div className="flex items-center justify-center gap-3">
                                    <button
                                        onClick={() => onEdit(item)}
                                        className="p-2 text-amber-500 hover:bg-amber-500/20 rounded-xl transition-all border border-amber-500/20 shadow-md"
                                        title="Edit Entry"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => onDelete(item._id)}
                                        className="p-2 text-red-500 hover:bg-red-500/20 rounded-xl transition-all border border-red-500/20 shadow-md text-xl font-black leading-none"
                                        title="Delete Entry"
                                    >
                                        &times;
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {history.length === 0 && (
                        <tr>
                            <td colSpan="4" className="py-20 text-center text-text-secondary font-black italic text-sm uppercase tracking-widest">
                                No inventory movement logs found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
