const Budget = require('../models/Budget');

const createBudget = async (req, res) => {
    const { userId, income, expenses, savingsGoal, allocation } = req.body;

    try {
        const newBudget = new Budget({
            userId,
            income,
            expenses,
            savingsGoal,
            allocation,
        });

        await newBudget.save();

        res.status(201).json({ message: 'Budget created successfully', budget: newBudget });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const getBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find();
        res.status(200).json(budgets);
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const getBudgetById = async (req, res) => {
    const { id } = req.params;

    try {
        const budget = await Budget.findById(id);
        if (!budget) {
            return res.status(404).json({ message: 'Budget not found' });
        }
        res.status(200).json(budget);
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const updateBudget = async (req, res) => {
    const { id } = req.params;
    const { income, expenses, savingsGoal, allocation } = req.body;

    try {
        const budget = await Budget.findById(id);
        if (!budget) {
            return res.status(404).json({ message: 'Budget not found' });
        }

        budget.income = income;
        budget.expenses = expenses;
        budget.savingsGoal = savingsGoal;
        budget.allocation = allocation;

        await budget.save();

        res.status(200).json({ message: 'Budget updated successfully', budget });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const deleteBudget = async (req, res) => {
    const { id } = req.params;

    try {
        const budget = await Budget.findById(id);
        if (!budget) {
            return res.status(404).json({ message: 'Budget not found' });
        }

        await budget.remove();

        res.status(200).json({ message: 'Budget deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { createBudget, getBudgets, getBudgetById, updateBudget, deleteBudget };
