const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const dashboardController = require('../controllers/dashboardController');

router.use(authenticateToken); // Protect all dashboard routes

router.get('/stats', dashboardController.getDashboardStats);

module.exports = router;
