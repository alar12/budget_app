const mongoose = require('mongoose');

// Define the schema for the SavingsPlan collection
const SavingsPlanSchema = new mongoose.Schema({
  goal: { 
    type: String, // The savings goal (e.g., buying a car, vacation)
    required: true
  },
  amount: { 
    type: Number, // The total amount required to achieve the savings goal
    required: true
  },
  percentage: { 
    type: Number, // The percentage of disposable income to be saved each month
    required: true
  },
  amountToSavePerMonth: { 
    type: Number, // The calculated amount to save each month
    required: true
  },
  monthsRequired: { 
    type: Number, // The number of months needed to reach the savings goal
    required: true
  },
  currentMonth: { 
    type: Number, // The current month in the savings plan timeline
    required: true
  },
  wallet: { 
    type: Number, // The current amount saved in the wallet
    required: true
  }
});

// Export the SavingsPlan model based on the schema
module.exports = mongoose.model('SavingsPlan', SavingsPlanSchema);
