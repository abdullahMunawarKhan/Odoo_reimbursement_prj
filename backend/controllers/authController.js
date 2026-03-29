const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Company = require('../models/companyModel');
const Whitelist = require('../models/whitelistModel');
const { hashPassword, comparePassword } = require('../utils/authUtils');
const pool = require('../config/db');

exports.signup = async (req, res) => {
    // Admin signup
    const { name, email, password, company_name } = req.body;

    if (!name || !email || !password || !company_name) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const client = await pool.pool.connect();
    try {
        await client.query('BEGIN');

        // Check if user already exists
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            await client.query('ROLLBACK');
            return res.status(400).json({ error: 'User already exists' });
        }

        // 1. Create company
        const companyRes = await client.query('INSERT INTO companies (name) VALUES ($1) RETURNING *', [company_name]);
        const company = companyRes.rows[0];

        // 2. Hash password
        const hashedPassword = await hashPassword(password);

        // 3. Create admin user
        const userRes = await client.query(
            `INSERT INTO users (name, email, password, role, company_id) 
            VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role, company_id`,
            [name, email, hashedPassword, 'admin', company.id]
        );
        const user = userRes.rows[0];

        // 4. Add admin entry into auth_whitelist
        await client.query(
            `INSERT INTO auth_whitelist (name, email, role, company_id, status) 
            VALUES ($1, $2, $3, $4, $5)`,
            [name, email, 'admin', company.id, 'active']
        );

        await client.query('COMMIT');

        // 5. Return JWT token
        const token = jwt.sign(
            { id: user.id, role: user.role, company_id: user.company_id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(201).json({ message: 'Admin account created successfully', token, user });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error(err);
        res.status(500).json({ error: 'Server error during signup: ' + err.message });
    } finally {
        client.release();
    }
};

exports.userSignup = async (req, res) => {
    // Employee / Manager signup
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const client = await pool.pool.connect();
    try {
        await client.query('BEGIN');

        // 1. Check if email exists in auth_whitelist
        const whitelistEntryRes = await client.query('SELECT * FROM auth_whitelist WHERE email = $1', [email]);
        const whitelistEntry = whitelistEntryRes.rows[0];

        if (!whitelistEntry) {
            await client.query('ROLLBACK');
            return res.status(403).json({ error: 'Not authorized, contact admin. You are not invited.' });
        }

        if (whitelistEntry.status === 'active') {
             const existingUser = await User.findByEmail(email);
             if (existingUser) {
                 await client.query('ROLLBACK');
                 return res.status(400).json({ error: 'Account already registered.' });
             }
        }

        // 2. Hash password
        const hashedPassword = await hashPassword(password);

        // 3. Create user in users table
        const userQuery = `
            INSERT INTO users (name, email, password, role, company_id) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING id, name, email, role, company_id
        `;
        const userRes = await client.query(userQuery, [
            name, email, hashedPassword, whitelistEntry.role, whitelistEntry.company_id
        ]);
        const user = userRes.rows[0];

        // 4. Update whitelist status
        await client.query('UPDATE auth_whitelist SET status = $1 WHERE email = $2', ['active', email]);

        await client.query('COMMIT');

        // 5. Return JWT
        const token = jwt.sign(
            { id: user.id, role: user.role, company_id: user.company_id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(201).json({ message: 'User account created successfully', token, user });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error(err);
        res.status(500).json({ error: 'Server error during user signup' });
    } finally {
        client.release();
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide email and password' });
    }

    try {
        // 1. Check user exists
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        if (!user.is_active) {
            return res.status(403).json({ error: 'Account is deactivated' });
        }

        // 2. Validate password
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // 3. Check whitelist active
        const whitelistEntry = await Whitelist.findByEmail(email);
        if (!whitelistEntry || whitelistEntry.status !== 'active') {
             return res.status(403).json({ error: 'Account setup incomplete or unauthorized' });
        }

        // 4. Return JWT
        const token = jwt.sign(
            { id: user.id, role: user.role, company_id: user.company_id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: 'Logged in successfully',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                company_id: user.company_id
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error during login' });
    }
};
