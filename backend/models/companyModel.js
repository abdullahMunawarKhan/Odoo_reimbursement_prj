const pool = require('../config/db');

class Company {
    static async create(name) {
        const query = 'INSERT INTO companies (name) VALUES ($1) RETURNING *';
        const res = await pool.query(query, [name]);
        return res.rows[0];
    }
    
    static async getById(id) {
        const query = 'SELECT * FROM companies WHERE id = $1';
        const res = await pool.query(query, [id]);
        return res.rows[0];
    }
}

module.exports = Company;
