const router = require('express').Router();

const { adminRegister, adminLogIn, getAdminDetail } = require('../controllers/authController');
const { createBudget, getBudgets, getBudgetById, updateBudget, deleteBudget } = require('../controllers/budgetController');

// Admin
router.post('/AdminReg', adminRegister);
router.post('/AdminLogin', adminLogIn);
router.get("/Admin/:id", getAdminDetail);

// Budget
router.post('/budget', createBudget);
router.get('/budgets', getBudgets);
router.get('/budget/:id', getBudgetById);
router.put('/budget/:id', updateBudget);
router.delete('/budget/:id', deleteBudget);

module.exports = router;
