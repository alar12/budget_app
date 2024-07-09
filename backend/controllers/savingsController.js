const SavingsPlan = require('../models/SavingsPlan');

// Create a new savings plan
exports.createPlan = async (req, res) => {
  try {
    const { goal, amount, percentage, amountToSavePerMonth, monthsRequired, currentMonth, wallet } = req.body;

    // Create a new instance of SavingsPlan using the request body
    const newPlan = new SavingsPlan({
      goal,
      amount,
      percentage,
      amountToSavePerMonth,
      monthsRequired,
      currentMonth,
      wallet
    });

    // Save the new plan to the database
    const savedPlan = await newPlan.save();

    // Send the saved plan back as a JSON response
    res.status(200).json(savedPlan);
  } catch (err) {
    // Handle errors and send an error response
    console.error(err);
    res.status(500).json({ error: 'Failed to save the savings plan' });
  }
};

// Get all savings plans
exports.getPlans = async (req, res) => {
  try {
    // Fetch all savings plans from the database
    const plans = await SavingsPlan.find();

    // Send the plans back as a JSON response
    res.status(200).json(plans);
  } catch (err) {
    // Handle errors and send an error response
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch savings plans' });
  }
};

// Update a savings plan by ID
exports.updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { goal, amount, percentage, amountToSavePerMonth, monthsRequired, currentMonth, wallet } = req.body;

    // Find the savings plan by ID
    let plan = await SavingsPlan.findById(id);

    if (!plan) {
      return res.status(404).json({ error: 'Savings plan not found' });
    }

    // Update the plan properties
    plan.goal = goal;
    plan.amount = amount;
    plan.percentage = percentage;
    plan.amountToSavePerMonth = amountToSavePerMonth;
    plan.monthsRequired = monthsRequired;
    plan.currentMonth = currentMonth;
    plan.wallet = wallet;

    // Save the updated plan
    const updatedPlan = await plan.save();

    // Send the updated plan back as a JSON response
    res.status(200).json(updatedPlan);
  } catch (err) {
    // Handle errors and send an error response
    console.error(err);
    res.status(500).json({ error: 'Failed to update the savings plan' });
  }
};
