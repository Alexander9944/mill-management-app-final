const mongoose = require('mongoose');

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
        default: null
    },
    pricePerUnit: {
        type: Number,
        default: null
    },
    amount: {
        type: Number,
        required: true
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

module.exports = mongoose.model('AccountTransaction', AccountTransactionSchema);
