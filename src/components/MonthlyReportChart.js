'use client';

export default function MonthlyReportChart({ transactions }) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const getMonthlyData = () => {
        const data = {};
        const now = new Date();

        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const key = `${d.getFullYear()}-${d.getMonth()}`;
            data[key] = {
                label: months[d.getMonth()],
                income: 0,
                expense: 0,
                month: d.getMonth(),
                year: d.getFullYear()
            };
        }

        transactions.forEach(t => {
            const d = new Date(t.date);
            const key = `${d.getFullYear()}-${d.getMonth()}`;
            if (data[key]) {
                if (t.type === 'credit') {
                    data[key].income += t.amount;
                } else if (t.type === 'debit') {
                    data[key].expense += t.amount;
                }
            }
        });

        return Object.values(data);
    };

    const monthlyData = getMonthlyData();
    const maxVal = Math.max(...monthlyData.map(d => Math.max(d.income, d.expense)), 1000);

    const formatShortValue = (val) => {
        if (val >= 100000) return `${(val / 100000).toFixed(1)}L`;
        if (val >= 1000) return `${(val / 1000).toFixed(1)}k`;
        return val.toString();
    };

    return (
        <div className="glass rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-8 border-2 border-border-color shadow-2xl overflow-hidden animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-10">
                <div>
                    <h3 className="text-[10px] md:text-xs font-black text-text-secondary uppercase tracking-[0.2em] mb-1 md:mb-2">6-Month Financial Pulse</h3>
                    <p className="text-xl md:text-2xl font-black text-text-primary tracking-tight">Monthly Performance Report</p>
                </div>
                <div className="flex gap-4 md:gap-6">
                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.7)]"></div>
                        <span className="text-[10px] md:text-xs font-black text-text-primary uppercase tracking-widest">Income</span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.7)]"></div>
                        <span className="text-[10px] md:text-xs font-black text-text-primary uppercase tracking-widest">Expense</span>
                    </div>
                </div>
            </div>

            <div className="relative h-48 md:h-64 flex items-end justify-between gap-2 md:gap-6 px-1 md:px-4">
                {/* Horizontal Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none pb-8">
                    <div className="w-full border-t-2 border-text-secondary"></div>
                    <div className="w-full border-t-2 border-text-secondary"></div>
                    <div className="w-full border-t-2 border-text-secondary"></div>
                </div>

                {monthlyData.map((d, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center group relative h-full justify-end pb-8">
                        <div className="w-full flex justify-center items-end gap-1 md:gap-2 h-40 md:h-48">
                            <div
                                className="w-3 md:w-6 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-md transition-all duration-700 ease-out relative group/bar shadow-lg"
                                style={{ height: `${(d.income / maxVal) * 100}%` }}
                            >
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[8px] md:text-[10px] font-black px-1.5 md:px-2 py-0.5 md:py-1 rounded-lg shadow-xl z-20 whitespace-nowrap">
                                    +{formatShortValue(d.income)}
                                </div>
                            </div>

                            <div
                                className="w-3 md:w-6 bg-gradient-to-t from-red-600 to-red-400 rounded-t-md transition-all duration-700 ease-out relative group/bar shadow-lg"
                                style={{ height: `${(d.expense / maxVal) * 100}%` }}
                            >
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[8px] md:text-[10px] font-black px-1.5 md:px-2 py-0.5 md:py-1 rounded-lg shadow-xl z-20 whitespace-nowrap">
                                    -{formatShortValue(d.expense)}
                                </div>
                            </div>
                        </div>
                        <span className="absolute bottom-0 text-[10px] md:text-xs font-black text-text-primary uppercase tracking-widest mt-4">
                            {d.label}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-10 pt-6 border-t-2 border-border-color flex justify-between items-center bg-white/5 p-4 rounded-xl">
                <p className="text-xs text-text-secondary italic font-black">
                    Analysis generated on {new Date().toLocaleDateString()}. Data refreshes monthly.
                </p>
                <div className="text-xs font-black text-emerald-600 bg-emerald-500/20 px-4 py-1.5 rounded-full uppercase tracking-[0.2em] border-2 border-emerald-500/30">
                    High Visibility Report
                </div>
            </div>
        </div>
    );
}
