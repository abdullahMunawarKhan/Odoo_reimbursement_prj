const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const signup = async (req, res) => {
    try {
        const { name, email, password, role, company_id } = req.body;

        // Check user existence
        const userExists = await User.findByEmail(email);
        if (userExists) return res.status(400).json({ error: "User already exists!" });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = await User.create({ name, email, password: hashedPassword, role, company_id });

        // Generate JWT
        const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({ token, user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error!" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findByEmail(email);
        if (!user) return res.status(400).json({ error: "Invalid Credentials!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid Credentials!" });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role, company_id: user.company_id }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error!" });
    }
};

module.exports = { signup, login };
