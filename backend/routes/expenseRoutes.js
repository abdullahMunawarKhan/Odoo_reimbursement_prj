const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const { submitExpense, getExpenses } = require('../controllers/expenseController');

router.post('/submit', authMiddleware, submitExpense);
router.get('/', authMiddleware, getExpenses);

module.exports = router;
