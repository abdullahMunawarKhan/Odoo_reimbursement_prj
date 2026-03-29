const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const { submitExpense, getExpenses } = require('../controllers/expenseController');

router.post('/submit', authenticateToken, submitExpense);
router.get('/', authenticateToken, getExpenses);

module.exports = router;
