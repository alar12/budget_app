const SavingsPlan = require('../models/SavingsPlan');

// Create a new savings plan
exports.createPlan = async (req, res) => {
  try {
    const { principal, interestRate, termLength, dueDate } = req.body;

    // Create a new instance of SavingsPlan using the request body
    const newPlan = new SavingsPlan({
      principal,
      interestRate,
      termLength,
      dueDate
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
