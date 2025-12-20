'use client';

export default function TransactionTable({ transactions, onDelete, onEdit }) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="overflow-x-auto p-4">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-white/[0.05] border-b-2 border-border-color">
                        <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-black text-text-primary uppercase tracking-widest">Date</th>
                        <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-black text-text-primary uppercase tracking-widest text-center">Type</th>
                        <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-black text-text-primary uppercase tracking-widest">Category</th>
                        <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-black text-text-primary uppercase tracking-widest text-right">Amount</th>
                        <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-black text-text-primary uppercase tracking-widest text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y-2 divide-border-color">
                    {transactions.map((t) => (
                        <tr key={t._id} className="group hover:bg-white/[0.05] transition-colors">
                            <td className="px-3 md:px-6 py-3 md:py-4">
                                <span className="text-sm font-black text-text-primary">
                                    {new Date(t.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                </span>
                            </td>
                            <td className="px-3 md:px-6 py-3 md:py-4 text-center">
                                <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg border-2 ${t.type === 'credit'
                                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600'
                                    : 'bg-red-500/10 border-red-500/30 text-red-600'
                                    }`}>
                                    {t.type}
                                </span>
                            </td>
                            <td className="px-3 md:px-6 py-3 md:py-4">
                                <p className="text-base font-black text-text-primary leading-tight mb-1">{t.category}</p>
                                {t.quantity ? (
                                    <p className="text-xs text-text-secondary font-black">
                                        {t.quantity} &times; {formatCurrency(t.pricePerUnit)}
                                    </p>
                                ) : t.remarks ? (
                                    <p className="text-xs text-text-secondary italic font-black truncate max-w-[150px]">{t.remarks}</p>
                                ) : null}
                            </td>
                            <td className={`px-3 md:px-6 py-3 md:py-4 text-right text-base font-black tabular-nums ${t.type === 'credit' ? 'text-emerald-600' : 'text-red-500'
                                }`}>
                                {t.type === 'credit' ? '+' : '-'} {formatCurrency(t.amount)}
                            </td>
                            <td className="px-3 md:px-6 py-3 md:py-4 text-center">
                                <div className="flex items-center justify-center gap-3">
                                    <button
                                        onClick={() => onEdit(t)}
                                        className="p-2 text-amber-500 hover:bg-amber-500/20 rounded-xl transition-all border-2 border-amber-500/20 shadow-md"
                                        title="Edit Entry"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => onDelete(t._id)}
                                        className="p-2 text-red-500 hover:bg-red-500/20 rounded-xl transition-all border-2 border-red-500/20 shadow-md text-xl font-black leading-none"
                                        title="Delete Entry"
                                    >
                                        &times;
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {transactions.length === 0 && (
                <div className="py-20 text-center text-text-secondary font-black italic text-sm uppercase tracking-widest">
                    Zero financial entries found in the vault.
                </div>
            )}
        </div>
    );
}
