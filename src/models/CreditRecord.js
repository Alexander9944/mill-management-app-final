import mongoose from 'mongoose';

const CreditRecordSchema = new mongoose.Schema({
    shopName: {
        type: String,
        required: true,
        trim: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    amountPaid: {
        type: Number,
        default: 0
    },
    remainingAmount: {
        type: Number
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    dueDate: {
        type: Date
    },
    notes: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Auto-calculate remaining amount before validation
CreditRecordSchema.pre('validate', function (next) {
    const total = Number(this.totalAmount) || 0;
    const paid = Number(this.amountPaid) || 0;
    this.remainingAmount = total - paid;

    if (this.remainingAmount <= 0) {
        this.status = 'completed';
    } else {
        this.status = 'pending';
    }
    this.updatedAt = Date.now();
    next();
});

const CreditRecord = mongoose.models.CreditRecord || mongoose.model('CreditRecord', CreditRecordSchema);
export default CreditRecord;
