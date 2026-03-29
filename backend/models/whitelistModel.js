const pool = require('../config/db');

class Whitelist {
    static async create({ name, email, role, company_id, invited_by, status = 'pending' }) {
        const query = `
            INSERT INTO auth_whitelist 
            (name, email, role, company_id, invited_by, status, expires_at) 
            VALUES ($1, $2, $3, $4, $5, $6, NOW() + INTERVAL '7 days') 
            RETURNING *
        `;
        const res = await pool.query(query, [name, email, role, company_id, invited_by, status]);
        return res.rows[0];
    }
    
    static async findByEmail(email) {
        const query = 'SELECT * FROM auth_whitelist WHERE email = $1';
        const res = await pool.query(query, [email]);
        return res.rows[0];
    }
    
    static async markAsActive(email) {
        const query = 'UPDATE auth_whitelist SET status = $1 WHERE email = $2 RETURNING *';
        const res = await pool.query(query, ['active', email]);
        return res.rows[0];
    }

    static async findByToken(token) {
        const query = 'SELECT * FROM auth_whitelist WHERE invite_token = $1';
        const res = await pool.query(query, [token]);
        return res.rows[0];
    }
}

module.exports = Whitelist;
