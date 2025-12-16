'use client';

export default function StockCard({ stock, onAddClick, onRemoveClick }) {
    const getStatusColor = (quantity) => {
        if (quantity === 0) return 'bg-red-100 border-red-200';
        if (quantity < 100) return 'bg-yellow-100 border-yellow-200';
        return 'bg-green-100 border-green-200';
    };

    const getStatusText = (quantity) => {
        if (quantity === 0) return 'Out of Stock';
        if (quantity < 100) return 'Low Stock';
        return 'In Stock';
    };

    const lastUpdated = new Date(stock.lastUpdated).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className={`rounded-lg shadow-lg p-6 border-2 ${getStatusColor(stock.quantity)}`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">{stock.name}</h3>
                    <p className="text-sm text-gray-600">{stock.unit}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${stock.quantity === 0 ? 'bg-red-500 text-white' : stock.quantity < 100 ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white'}`}>
                    {getStatusText(stock.quantity)}
                </span>
            </div>

            <div className="mb-4 p-4 bg-white bg-opacity-50 rounded-lg">
                <p className="text-3xl font-bold text-gray-800">{stock.quantity}</p>
                <p className="text-sm text-gray-600 mt-2">Last updated: {lastUpdated}</p>
            </div>

            {stock.notes && (
                <p className="text-sm text-gray-600 mb-4">
                    <span className="font-semibold">Notes:</span> {stock.notes}
                </p>
            )}

            <div className="flex gap-2">
                <button
                    onClick={onAddClick}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                >
                    + Add
                </button>
                <button
                    onClick={onRemoveClick}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                >
                    - Remove
                </button>
            </div>
        </div>
    );
}
