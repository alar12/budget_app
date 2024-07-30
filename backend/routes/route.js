const router = require('express').Router();
const { adminRegister, adminLogIn, getAdminDetail } = require('../controllers/authController');
const { createPlan, getPlans, updatePlan } = require('../controllers/savingsController');
const { addTransaction, getTransactions, updateTransaction, deleteTransaction } = require('../controllers/transactionsController');
const { getDisposableIncome, updateDisposableIncome } = require('../controllers/disposableIncomeController');
const { getForecastingData } = require('../controllers/forecastController');

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

// Disposable Income
router.get('/api/disposable-income', getDisposableIncome);
router.post('/api/disposable-income', updateDisposableIncome);

// Forecasting
router.get('/api/forecast', getForecastingData);

module.exports = router;
