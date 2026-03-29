const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes'));
// app.use('/api/approvals', require('./routes/approvalRoutes'));

app.get('/', (req, res) => {
    res.json({ message: "Welcome to Reimbursement Management System API! 🚀" });
});

module.exports = app;
