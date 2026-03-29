const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

// Only Admins can access user management endpoints
router.post('/create', authenticateToken, authorizeRole('admin'), userController.createUser);
router.get('/', authenticateToken, authorizeRole('admin'), userController.getUsers);

module.exports = router;
