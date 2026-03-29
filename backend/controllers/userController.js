const Whitelist = require('../models/whitelistModel');
const User = require('../models/userModel');
const { generateRandomPassword, hashPassword, sendEmail } = require('../utils/authUtils');
const pool = require('../config/db');

exports.createUser = async (req, res) => {
    // Admin creates employee/manager
    const { name, email, role, designation, manager_id } = req.body;
    const { user_id: admin_id, company_id } = req.user;

    if (!name || !email || !role) {
        return res.status(400).json({ error: 'Please provide all required fields (name, email, role)' });
    }

    if (!['employee', 'manager'].includes(role)) {
        return res.status(400).json({ error: 'Invalid role. Must be manager or employee.' });
    }

    if (role === 'employee' && !manager_id) {
        // Technically optional if no managers exist, but user spec "Manager_id required if role = employee"
        return res.status(400).json({ error: 'Manager ID is required for employee role.' });
    }

    const client = await pool.pool.connect();
    try {
        await client.query('BEGIN');

        // 1. Check if email exists in whitelist
        const existingEntryRes = await client.query('SELECT * FROM auth_whitelist WHERE email = $1', [email]);
        if (existingEntryRes.rows.length > 0) {
             await client.query('ROLLBACK');
             return res.status(400).json({ error: 'User with this email is already invited or exists.' });
        }

        // 2. Insert into auth_whitelist
        const whitelistQuery = `
            INSERT INTO auth_whitelist (name, email, role, company_id, invited_by, status, expires_at) 
            VALUES ($1, $2, $3, $4, $5, 'pending', NOW() + INTERVAL '7 days') 
            RETURNING *
        `;
        const whitelistRes = await client.query(whitelistQuery, [name, email, role, company_id, admin_id]);
        const whitelistEntry = whitelistRes.rows[0];

        // 3. Generate random password
        const randomPassword = generateRandomPassword(12);

        // 4. Hash password
        const hashedPassword = await hashPassword(randomPassword);

        // 5. Optionally create the user right away (since admin handles the creation here) 
        // OR let them signup using the password sent to email. The prompt says: "Generate random password, hash password, send email". 
        // And for user signup: "User enters name, email, password... Check if email exists in auth_whitelist... Create user".
        // SO we ONLY put them in the whitelist here and send an email with a mock signup link, wait we shouldn't create the user here because user signup endpoint does that.
        // Wait, the prompt says for Admin creates users:
        // "Insert them into auth_whitelist with ... Generate random password ... Hash password ... Optionally send email"
        // Wait, if we hash the password, where do we save it? The whitelist table DOES NOT have a password column.
        // Let's re-read: "Generate random password -> Hash password -> send email". If they sign up themselves, they provide a password. So why hash password on admin creation?
        // Maybe the user schema expects the user to be pre-created by admin? 
        // Let's check prompt: 
        // For User Signup: "User enters name, email, password. Check if email exists in whitelist... Create user in users table."
        // That implies they enter their OWN password on signup. So the random password on admin create might be a misunderstanding or unused. I will just send a mock email.

        await client.query('COMMIT');

        // Mock send email
        await sendEmail({
            to: email,
            subject: 'You have been invited!',
            text: `Hello ${name},\n You have been invited to join as ${role}. Please sign up using this email.`
        });

        res.status(201).json({ 
            message: 'User invited successfully', 
            whitelistEntry,
            inviteLink: `http://localhost:5173/auth/signup?email=${encodeURIComponent(email)}`
        });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error(err);
        res.status(500).json({ error: 'Server error during user creation' });
    } finally {
        client.release();
    }
};

exports.getUsers = async (req, res) => {
    const { company_id } = req.user;

    try {
        const users = await User.findByCompany(company_id);
        
        // Also get pending invites
        const pendingInvitesRes = await pool.query(
            "SELECT id, name, email, role, 'pending' as status, invite_token, expires_at FROM auth_whitelist WHERE company_id = $1 AND status = 'pending'", 
            [company_id]
        );
        const pendingInvites = pendingInvitesRes.rows;

        res.status(200).json({ 
            users,
            pendingInvites 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
};
