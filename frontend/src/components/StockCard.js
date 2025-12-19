'use client';

export default function StockCard({ stock, onAddClick, onRemoveClick }) {
    const getStatusStyles = (quantity) => {
        if (quantity === 0) return 'from-red-500/10 to-orange-500/5 border-red-500/20 text-red-500';
        if (quantity < 100) return 'from-amber-500/10 to-yellow-500/5 border-amber-500/20 text-amber-500';
        return 'from-emerald-500/10 to-teal-500/5 border-emerald-500/20 text-emerald-500';
    };

    const getStatusText = (quantity) => {
        if (quantity === 0) return 'Empty';
        if (quantity < 100) return 'Low';
        return 'Healthy';
    };

    const lastUpdated = new Date(stock.lastUpdated);

    return (
        <div className={`glass glass-hover rounded-2xl p-3 flex flex-col h-full animate-fade-in border-t border-white/5 shadow-lg overflow-hidden relative group`}>
            {/* Background Gradient Glow */}
            <div className={`absolute -top-10 -right-10 w-20 h-20 rounded-full blur-[40px] opacity-10 transition-all duration-500 group-hover:scale-150 ${stock.quantity === 0 ? 'bg-red-500' : stock.quantity < 100 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}></div>

            <div className="flex justify-between items-start mb-3 relative z-10">
                <div>
                    <h3 className="text-sm font-black text-text-primary tracking-tight leading-none mb-1">{stock.name}</h3>
                    <p className="text-[9px] font-bold text-text-secondary uppercase tracking-widest">{stock.unit}</p>
                </div>
                <div className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider border bg-gradient-to-br ${getStatusStyles(stock.quantity)}`}>
                    {getStatusText(stock.quantity)}
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center py-2 relative z-10">
                <span className="text-3xl font-black text-text-primary tabular-nums tracking-tighter">
                    {stock.quantity}
                </span>
                <p className="text-[8px] text-text-secondary font-bold uppercase tracking-widest text-center mt-1">
                    Inventory
                </p>
            </div>

            <div className="mt-2 space-y-2 relative z-10">
                <div className="flex gap-1.5">
                    <button
                        onClick={onAddClick}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1.5 rounded-lg transition-all duration-200 text-[10px] uppercase tracking-wider shadow-sm"
                    >
                        + Add
                    </button>
                    <button
                        onClick={onRemoveClick}
                        className="flex-1 bg-white/5 hover:bg-red-500/10 border border-border-color hover:border-red-500/30 text-text-secondary hover:text-red-500 font-bold py-1.5 rounded-lg transition-all duration-200 text-[10px] uppercase tracking-wider"
                    >
                        - Remove
                    </button>
                </div>

                <div className="pt-2 border-t border-border-color flex justify-between items-center opacity-70">
                    <p className="text-[8px] text-text-secondary italic">
                        {lastUpdated.toLocaleDateString()} {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    {stock.notes && (
                        <span className="text-[8px] text-text-secondary truncate max-w-[50px]" title={stock.notes}>
                            📝
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
