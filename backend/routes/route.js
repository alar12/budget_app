const router = require('express').Router();

const { adminRegister, adminLogIn, getAdminDetail } = require('../controllers/authController');

// Admin
router.post('/AdminReg', adminRegister);
router.post('/AdminLogin', adminLogIn);
router.get("/Admin/:id", getAdminDetail)

module.exports = router;