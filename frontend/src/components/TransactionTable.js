'use client';

export default function TransactionTable({ transactions, onDelete }) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-white/[0.03] border-b border-border-color">
                        <th className="px-4 py-2 text-[9px] font-black text-text-secondary uppercase tracking-widest">Date</th>
                        <th className="px-4 py-2 text-[9px] font-black text-text-secondary uppercase tracking-widest">Type</th>
                        <th className="px-4 py-2 text-[9px] font-black text-text-secondary uppercase tracking-widest">Item</th>
                        <th className="px-4 py-2 text-[9px] font-black text-text-secondary uppercase tracking-widest text-right">Sum</th>
                        <th className="px-4 py-2 text-[9px] font-black text-text-secondary uppercase tracking-widest text-center">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border-color">
                    {transactions.map((t) => (
                        <tr key={t._id} className="group hover:bg-white/[0.02] transition-colors">
                            <td className="px-4 py-2">
                                <span className="text-[10px] font-bold text-text-secondary font-mono">
                                    {new Date(t.date).toLocaleDateString('en-GB')}
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className={`px-1.5 py-0.5 text-[8px] font-black uppercase tracking-tighter rounded border ${t.type === 'credit'
                                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600'
                                        : 'bg-red-500/10 border-red-500/20 text-red-600'
                                    }`}>
                                    {t.type}
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <p className="text-[11px] font-bold text-text-primary leading-tight">{t.category}</p>
                                {t.quantity ? (
                                    <p className="text-[8px] text-text-secondary font-medium">
                                        {t.quantity} &times; {formatCurrency(t.pricePerUnit)}
                                    </p>
                                ) : t.remarks ? (
                                    <p className="text-[8px] text-text-secondary italic truncate max-w-[120px]">{t.remarks}</p>
                                ) : null}
                            </td>
                            <td className={`px-4 py-2 text-right text-xs font-black tabular-nums ${t.type === 'credit' ? 'text-emerald-600' : 'text-red-600'
                                }`}>
                                {t.type === 'credit' ? '+' : '-'} {formatCurrency(t.amount)}
                            </td>
                            <td className="px-4 py-2 text-center">
                                <button
                                    onClick={() => onDelete(t._id)}
                                    className="p-1 text-text-secondary/30 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100 font-bold"
                                >
                                    &times;
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {transactions.length === 0 && (
                <div className="py-10 text-center text-text-secondary font-medium italic text-[10px]">
                    Zero entries found.
                </div>
            )}
        </div>
    );
}
