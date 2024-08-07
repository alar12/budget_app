const SavingsPlan = require('../models/SavingsPlan');
const Transaction = require('../models/Transaction');

// Get forecasting data
exports.getForecastingData = async (req, res) => {
  try {
    // Fetch all savings plans and transactions
    const savingsPlans = await SavingsPlan.find();
    const transactions = await Transaction.find();

    res.status(200).json({ savingsPlans, transactions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch forecasting data' });
  }
};
