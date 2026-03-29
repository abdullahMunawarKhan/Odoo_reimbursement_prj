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
const getTeamExpenses = async (req, res) => {
    try {
        const managerId = req.user.id;
        const result = await pool.query(`
            SELECT e.*, u.name as user_name 
            FROM expenses e
            JOIN users u ON e.user_id = u.id
            WHERE u.manager_id = $1 OR e.user_id = $1
            ORDER BY e.created_at DESC
        `, [managerId]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch team expenses" });
    }
};

const getAllExpenses = async (req, res) => {
    try {
        const companyId = req.user.company_id;
        const result = await pool.query(`
            SELECT e.*, u.name as user_name, u.email as user_email
            FROM expenses e
            JOIN users u ON e.user_id = u.id
            WHERE u.company_id = $1
            ORDER BY e.created_at DESC
        `, [companyId]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch all expenses" });
    }
};

const updateExpenseStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const role = req.user.role;

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }

        if (role === 'employee') {
            return res.status(403).json({ error: "Only Managers and Admins can update status." });
        }

        const result = await pool.query(
            'UPDATE expenses SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Action failed" });
    }
};

module.exports = { submitExpense, getExpenses, getTeamExpenses, getAllExpenses, updateExpenseStatus };
