const DisposableIncome = require('../models/DisposableIncome');

// Get current disposable income
exports.getDisposableIncome = async (req, res) => {
  try {
    const disposableIncome = await DisposableIncome.findOne();
    res.status(200).json(disposableIncome);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch disposable income' });
  }
};

// Update disposable income
exports.updateDisposableIncome = async (req, res) => {
  try {
    const { amount } = req.body;
    let disposableIncome = await DisposableIncome.findOne();

    if (disposableIncome) {
      // Update existing record
      disposableIncome.amount = amount;
      await disposableIncome.save();
    } else {
      // Create new record
      disposableIncome = new DisposableIncome({ amount });
      await disposableIncome.save();
    }

    res.status(200).json(disposableIncome);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update disposable income' });
  }
};
