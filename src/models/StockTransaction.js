import mongoose from 'mongoose';

const StockTransactionSchema = new mongoose.Schema({
    stockId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock',
        required: true
    },
    type: {
        type: String,
        enum: ['add', 'remove'], // 'add' for restocking, 'remove' for usage/sale
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    remarks: {
        type: String,
        default: ''
    }
});

export default mongoose.models.StockTransaction || mongoose.model('StockTransaction', StockTransactionSchema);
