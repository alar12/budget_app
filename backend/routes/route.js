const router = require('express').Router();
const { adminRegister, adminLogIn, getAdminDetail } = require('../controllers/authController');
const { createPlan, getPlans } = require('../controllers/savingsController');

// Admin
router.post('/AdminReg', adminRegister);
router.post('/AdminLogin', adminLogIn);
router.get('/Admin/:id', getAdminDetail);

// Savings
router.post('/api/savings', createPlan);
router.get('/api/savings', getPlans);

module.exports = router;