const pool = require('../config/db');

class User {
    static async findByEmail(email) {
        const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return res.rows[0];
    }

    static async create({ name, email, password, role, company_id }) {
        const res = await pool.query(
            'INSERT INTO users (name, email, password, role, company_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role, company_id',
            [name, email, password, role, company_id]
        );
        return res.rows[0];
    }
}

module.exports = User;
