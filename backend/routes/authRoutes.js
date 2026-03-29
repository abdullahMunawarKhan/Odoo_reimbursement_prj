const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Admin Signup (Initial company creation)
router.post('/signup', authController.signup);

// Employee/Manager Signup (Requires active whitelist)
router.post('/user-signup', authController.userSignup);

// Universal Login
router.post('/login', authController.login);

module.exports = router;
