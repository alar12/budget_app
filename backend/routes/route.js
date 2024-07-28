const router = require('express').Router();
const { adminRegister, adminLogIn, getAdminDetail } = require('../controllers/authController');
const { createPlan, getPlans, updatePlan } = require('../controllers/savingsController');
const { addTransaction, getTransactions, updateTransaction, deleteTransaction } = require('../controllers/transactionsController.js');

// Admin
router.post('/AdminReg', adminRegister);
router.post('/AdminLogin', adminLogIn);
router.get('/Admin/:id', getAdminDetail);

// Savings
router.post('/api/savings', createPlan);
router.get('/api/savings', getPlans);
router.put('/api/savings/:id', updatePlan);

// Transactions
router.post('/api/transactions', addTransaction);
router.get('/api/transactions', getTransactions);
router.put('/api/transactions/:id', updateTransaction);
router.delete('/api/transactions/:id', deleteTransaction);

module.exports = router;
