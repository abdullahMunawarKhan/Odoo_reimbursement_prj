const pool = require('../config/db');

const submitExpense = async (req, res) => {
    try {
        const { amount, currency, category, description, date } = req.body;
        const userId = req.user.id; // From auth middleware

        const result = await pool.query(
            'INSERT INTO expenses (user_id, amount, currency, category, description, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [userId, amount, currency, category, description, 'pending']
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to submit expense" });
    }
};

const getExpenses = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await pool.query('SELECT * FROM expenses WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch expenses" });
    }
};

module.exports = { submitExpense, getExpenses };
