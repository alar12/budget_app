const Transaction = require('../models/Transaction');

// Add a new transaction
exports.addTransaction = async (req, res) => {
  try {
    const { title, description, amount, date } = req.body;
    const newTransaction = new Transaction({ title, description, amount, date });
    const savedTransaction = await newTransaction.save();
    res.status(200).json(savedTransaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add the transaction' });
  }
};

// Get all transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

// Update a transaction
exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTransaction = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedTransaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update the transaction' });
  }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete the transaction' });
  }
};
