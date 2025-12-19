'use client';

export default function StockHistoryTable({ history }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-white/[0.03] border-b border-border-color">
                        <th className="px-4 py-2 text-[9px] font-black text-text-secondary uppercase tracking-widest">Time</th>
                        <th className="px-4 py-2 text-[9px] font-black text-text-secondary uppercase tracking-widest">Description</th>
                        <th className="px-4 py-2 text-[9px] font-black text-text-secondary uppercase tracking-widest text-right">Qty</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border-color">
                    {history.map((item) => (
                        <tr key={item._id} className="group hover:bg-white/[0.02] transition-colors">
                            <td className="px-4 py-2 text-[10px] font-bold text-text-secondary font-mono">
                                {formatDate(item.date)}
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-[11px] font-black text-text-primary mr-2">{item.stockId?.name}</span>
                                <span className="text-[9px] text-text-secondary italic truncate max-w-[150px] inline-block">{item.remarks}</span>
                            </td>
                            <td className="px-4 py-2 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                    <span className={`text-[11px] font-black tabular-nums ${item.type === 'add' ? 'text-emerald-600' : 'text-red-500'}`}>
                                        {item.type === 'add' ? '+' : '-'}{item.quantity}
                                    </span>
                                    <span className="text-[8px] text-text-secondary font-black uppercase tracking-tighter">{item.stockId?.unit}</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {history.length === 0 && (
                        <tr>
                            <td colSpan="3" className="py-10 text-center text-text-secondary font-medium italic text-[10px]">
                                No movement history found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
