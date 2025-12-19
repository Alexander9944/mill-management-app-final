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
        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
            <div className="glass group overflow-hidden relative flex-1 min-w-[120px] p-3 rounded-xl border-t border-white/5 hover:border-emerald-500/30 transition-all shadow-sm">
                <div className="absolute top-0 right-0 w-12 h-12 bg-emerald-500/10 blur-[20px] rounded-full group-hover:scale-150 transition-transform"></div>
                <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest leading-none mb-2">Sales</p>
                <p className="text-sm font-black text-text-primary tabular-nums">{formatCurrency(summary.credit)}</p>
            </div>

            <div className="glass group overflow-hidden relative flex-1 min-w-[120px] p-3 rounded-xl border-t border-white/5 hover:border-red-500/30 transition-all shadow-sm">
                <div className="absolute top-0 right-0 w-12 h-12 bg-red-500/10 blur-[20px] rounded-full group-hover:scale-150 transition-transform"></div>
                <p className="text-[8px] font-black text-red-500 uppercase tracking-widest leading-none mb-2">Debits</p>
                <p className="text-sm font-black text-text-primary tabular-nums">{formatCurrency(summary.debit)}</p>
            </div>

            <div className="glass group overflow-hidden relative flex-1 min-w-[140px] p-3 rounded-xl border-2 border-violet-500/20 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 hover:border-violet-500/40 transition-all shadow-md">
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-violet-600/10 blur-[30px] rounded-full group-hover:scale-150 transition-transform"></div>
                <p className="text-[8px] font-black text-violet-500 uppercase tracking-widest leading-none mb-2">Net Balance</p>
                <p className={`text-lg font-black tabular-nums tracking-tighter ${summary.balance >= 0 ? 'text-text-primary' : 'text-orange-500'}`}>
                    {formatCurrency(summary.balance)}
                </p>
            </div>
        </div>
    );
}
