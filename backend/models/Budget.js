const mongoose = require('mongoose');

const budgetSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    income: { type: Number, required: true },
    expenses: [{ amount: Number, frequency: String }],
    savingsGoal: { type: Number, required: true },
    allocation: { type: Number, required: true },
}, { timestamps: true });

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;
