const pool = require('../config/db');

exports.getDashboardStats = async (req, res) => {
    try {
        const userId = req.user.id;
        const role = req.user.role;
        const companyId = req.user.company_id;

        if (role === 'employee') {
            const statsRes = await pool.query(`
                SELECT 
                    COUNT(*) as total_submitted,
                    COALESCE(SUM(CASE WHEN status = 'approved' THEN amount ELSE 0 END), 0) as approved_amount,
                    COALESCE(SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END), 0) as pending_amount
                FROM expenses 
                WHERE user_id = $1
            `, [userId]);
            
            return res.json({
                total_submitted: parseInt(statsRes.rows[0].total_submitted),
                approved_amount: parseFloat(statsRes.rows[0].approved_amount),
                pending_amount: parseFloat(statsRes.rows[0].pending_amount)
            });
        } 
        else if (role === 'manager') {
            // Team Total Expenses (Users where manager_id = req.user.id)
            const teamExpensesRes = await pool.query(`
                SELECT COALESCE(SUM(e.amount), 0) as team_total
                FROM expenses e
                JOIN users u ON e.user_id = u.id
                WHERE u.manager_id = $1 OR e.user_id = $1
            `, [userId]);

            // Pending My Approval
            const pendingApprovalsRes = await pool.query(`
                SELECT COUNT(*) as pending_count
                FROM expenses e
                JOIN users u ON e.user_id = u.id
                WHERE u.manager_id = $1 AND e.status = 'pending'
            `, [userId]);

            // Total Team Headcount
            const teamHeadcountRes = await pool.query(`
                SELECT COUNT(*) as team_count
                FROM users
                WHERE manager_id = $1 OR id = $1
            `, [userId]);

            return res.json({
                team_total: parseFloat(teamExpensesRes.rows[0].team_total),
                pending_count: parseInt(pendingApprovalsRes.rows[0].pending_count),
                team_count: parseInt(teamHeadcountRes.rows[0].team_count)
            });
        }
        else if (role === 'admin') {
            const rulesRes = await pool.query('SELECT COUNT(*) as active_rules FROM approval_rules WHERE company_id = $1', [companyId]);
            const usersRes = await pool.query('SELECT COUNT(*) as total_users FROM users WHERE company_id = $1', [companyId]);
            const totalRes = await pool.query('SELECT COALESCE(SUM(amount), 0) as total_expenses FROM expenses WHERE company_id = $1', [companyId]);
            
            return res.json({
                active_rules: parseInt(rulesRes.rows[0].active_rules),
                total_users: parseInt(usersRes.rows[0].total_users),
                total_expenses: parseFloat(totalRes.rows[0].total_expenses)
            });
        }
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
};
