import mongoose from 'mongoose';

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

export default mongoose.models.Stock || mongoose.model('Stock', StockSchema);
