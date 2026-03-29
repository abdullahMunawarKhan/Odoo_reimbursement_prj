const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'mydb',
    password: process.env.DB_PASSWORD || 'mysecurepassword',
    port: process.env.DB_PORT || 5432,
});

pool.on('connect', () => {
    console.log('PostgreSQL database connected! ✅');
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool
};
