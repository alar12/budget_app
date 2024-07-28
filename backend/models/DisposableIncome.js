const mongoose = require('mongoose');

const disposableIncomeSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
});

module.exports = mongoose.model('DisposableIncome', disposableIncomeSchema);
