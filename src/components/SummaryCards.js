'use client';

export default function SummaryCards({ summary }) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            <div className="glass p-6 rounded-2xl border-2 border-emerald-500/30 shadow-xl bg-gradient-to-br from-emerald-500/5 to-transparent">
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">Total Income</p>
                <p className="text-2xl font-black text-emerald-600 tabular-nums">{formatCurrency(summary.credit)}</p>
            </div>
            <div className="glass p-6 rounded-2xl border-2 border-red-500/30 shadow-xl bg-gradient-to-br from-red-500/5 to-transparent">
                <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-2">Total Expenses</p>
                <p className="text-2xl font-black text-red-600 tabular-nums">{formatCurrency(summary.debit)}</p>
            </div>
            <div className="glass p-6 rounded-2xl border-2 border-violet-500/30 shadow-xl bg-gradient-to-br from-violet-500/5 to-transparent">
                <p className="text-[10px] font-black text-violet-600 uppercase tracking-widest mb-2">Net Balance</p>
                <p className="text-2xl font-black text-violet-600 tabular-nums">{formatCurrency(summary.balance)}</p>
            </div>
            <div className="glass p-6 rounded-2xl border-2 border-amber-500/30 shadow-xl bg-gradient-to-br from-amber-500/5 to-transparent">
                <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2">Pending Collection</p>
                <p className="text-2xl font-black text-amber-600 tabular-nums">{formatCurrency(summary.pendingCollection || 0)}</p>
            </div>
        </div>
    );
}
