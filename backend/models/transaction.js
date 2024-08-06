const mongoose = require('mongoose');

// Define the schema for the Transaction collection
const transactionSchema = new mongoose.Schema({
  title: { 
    type: String, // The title of the transaction (e.g., 'Salary', 'Rent')
    required: true 
  },
  description: { 
    type: String // Additional details about the transaction
  },
  amount: { 
    type: Number, // The transaction amount (positive for income, negative for expense)
    required: true 
  },
  date: { 
    type: Date, // The date of the transaction
    default: Date.now // Default to the current date and time
  }
});

// Export the Transaction model based on the schema
module.exports = mongoose.model('Transaction', transactionSchema);
