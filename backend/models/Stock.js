const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    unit: {
        type: String,
        required: true, // e.g., 'Liters', 'Kg'
        trim: true
    },
    notes: {
        type: String,
        default: ''
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

// Calculate status based on quantity (optional logic can go here or in frontend)
// stocks: White Oil, Second Quality Oil, Lamp Oil, Kopra Stock, Diesel

module.exports = mongoose.model('Stock', StockSchema);
