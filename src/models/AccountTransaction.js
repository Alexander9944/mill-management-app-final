import mongoose from 'mongoose';

const AccountTransactionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['credit', 'debit'],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: null,
        min: 0
    },
    pricePerUnit: {
        type: Number,
        default: null,
        min: 0
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
    remarks: {
        type: String,
        trim: true
    }
});

export default mongoose.models.AccountTransaction || mongoose.model('AccountTransaction', AccountTransactionSchema);
