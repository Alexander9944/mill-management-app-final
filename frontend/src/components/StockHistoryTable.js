'use client';

export default function StockHistoryTable({ history }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (history.length === 0) {
        return (
            <div className="text-center py-8 text-gray-600">
                <p>No stock movements yet</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-100 border-b-2 border-gray-300">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Stock Item</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Quantity</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((transaction, index) => (
                        <tr key={transaction._id || index} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-medium text-gray-800">
                                {transaction.stockId?.name || 'Unknown'}
                            </td>
                            <td className="px-4 py-3 text-sm">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${transaction.type === 'add'
                                        ? 'bg-green-500'
                                        : 'bg-red-500'
                                        }`}
                                >
                                    {transaction.type === 'add' ? '+ Added' : '- Removed'}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-right font-semibold text-gray-800">
                                {transaction.quantity} {transaction.stockId?.unit || ''}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                                {formatDate(transaction.date)}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                                {transaction.remarks || '-'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
