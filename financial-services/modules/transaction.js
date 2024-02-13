import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    date: Date,
    type: {
        type: String,
        enum: ['income', 'expense'], 
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: String
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
