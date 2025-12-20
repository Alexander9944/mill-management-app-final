import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    expectedCompletionDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.Todo || mongoose.model('Todo', TodoSchema);
