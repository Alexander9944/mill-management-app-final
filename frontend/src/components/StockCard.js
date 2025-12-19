'use client';

export default function StockCard({ stock, onAddClick, onRemoveClick }) {
    const getStatusStyles = (quantity) => {
        if (quantity === 0) return 'from-red-600/20 to-orange-600/10 border-red-500/50 text-red-600';
        if (quantity < 100) return 'from-amber-600/20 to-yellow-600/10 border-amber-500/50 text-amber-600';
        return 'from-emerald-600/20 to-teal-600/10 border-emerald-500/50 text-emerald-600';
    };

    const getStatusText = (quantity) => {
        if (quantity === 0) return 'EMPTY';
        if (quantity < 100) return 'LOW';
        return 'HEALTHY';
    };

    const lastUpdated = new Date(stock.lastUpdated);

    return (
        <div className={`glass glass-hover rounded-2xl p-4 flex flex-col h-full animate-fade-in border border-border-color shadow-xl overflow-hidden relative group`}>
            {/* Background Gradient Glow */}
            <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-[50px] opacity-20 transition-all duration-500 group-hover:scale-150 ${stock.quantity === 0 ? 'bg-red-500' : stock.quantity < 100 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}></div>

            <div className="flex justify-between items-start mb-3 relative z-10">
                <div>
                    <h3 className="text-lg font-black text-text-primary tracking-tight leading-none mb-1 uppercase">{stock.name}</h3>
                    <p className="text-xs font-black text-text-secondary uppercase tracking-[0.2em]">{stock.unit}</p>
                </div>
                <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border bg-gradient-to-br ${getStatusStyles(stock.quantity)}`}>
                    {getStatusText(stock.quantity)}
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center py-2 relative z-10">
                <span className="text-4xl font-black text-text-primary tabular-nums tracking-tighter drop-shadow-sm">
                    {stock.quantity}
                </span>
                <p className="text-xs text-text-secondary font-black uppercase tracking-[0.2em] text-center mt-3">
                    INVENTORY COUNT
                </p>
            </div>

            <div className="mt-3 space-y-2 relative z-10">
                <div className="flex gap-3">
                    <button
                        onClick={onAddClick}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-2.5 rounded-xl transition-all duration-200 text-[10px] uppercase tracking-widest shadow-lg transform active:scale-95"
                    >
                        + RESTOCK
                    </button>
                    <button
                        onClick={onRemoveClick}
                        className="flex-1 bg-white/5 hover:bg-red-500/20 border border-border-color hover:border-red-500/50 text-text-primary hover:text-red-500 font-black py-2.5 rounded-xl transition-all duration-200 text-[10px] uppercase tracking-widest shadow-lg transform active:scale-95"
                    >
                        - DISPATCH
                    </button>
                </div>

                <div className="pt-3 border-t border-border-color flex justify-between items-center bg-white/5 p-2 rounded-lg">
                    <p className="text-[10px] text-text-primary italic font-black">
                        {lastUpdated.toLocaleDateString()} {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    {stock.notes && (
                        <span className="text-sm cursor-help" title={stock.notes}>
                            📝
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
