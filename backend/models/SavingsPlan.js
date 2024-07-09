const mongoose = require('mongoose');

const SavingsPlanSchema = new mongoose.Schema({
  goal: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  },
  amountToSavePerMonth: {
    type: Number,
    required: true
  },
  monthsRequired: {
    type: Number,
    required: true
  },
  currentMonth: {
    type: Number,
    required: true
  },
  wallet: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('SavingsPlan', SavingsPlanSchema);
