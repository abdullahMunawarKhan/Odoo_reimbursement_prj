const pool = require('../config/db');

class User {
    static async findByEmail(email) {
        const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return res.rows[0];
    }

    static async create({ name, email, password, role, company_id, manager_id, designation }) {
        const query = `
            INSERT INTO users (name, email, password, role, company_id, manager_id, designation) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) 
            RETURNING id, name, email, role, company_id, manager_id, designation, is_active
        `;
        const res = await pool.query(query, [name, email, password, role, company_id, manager_id, designation]);
        return res.rows[0];
    }
    
    static async findByCompany(company_id) {
        const query = 'SELECT id, name, email, role, designation, is_active FROM users WHERE company_id = $1';
        const res = await pool.query(query, [company_id]);
        return res.rows;
    }
}

module.exports = User;
