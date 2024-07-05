const mongoose = require('mongoose');

const SavingsPlanSchema = new mongoose.Schema({
  principal: {
    type: Number,
    required: true
  },
  interestRate: {
    type: Number,
    required: true
  },
  termLength: {
    type: Number,
    required: true
  },
  dueDate: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('SavingsPlan', SavingsPlanSchema);
