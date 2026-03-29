const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const { submitExpense, getExpenses, getTeamExpenses, getAllExpenses, updateExpenseStatus } = require('../controllers/expenseController');

router.post('/submit', authenticateToken, submitExpense);
router.get('/', authenticateToken, getExpenses);

// New roles-based routes
router.get('/team', authenticateToken, getTeamExpenses);
router.get('/all', authenticateToken, getAllExpenses);
router.patch('/status/:id', authenticateToken, updateExpenseStatus);

module.exports = router;
