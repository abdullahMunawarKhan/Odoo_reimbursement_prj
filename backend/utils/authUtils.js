const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Generate random password
const generateRandomPassword = (length = 10) => {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
};

// Hash password
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Compare password
const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

// Mock email sending
const sendEmail = async ({ to, subject, text }) => {
    console.log(`[MOCK EMAIL] Sending to: ${to}`);
    console.log(`[MOCK EMAIL] Subject: ${subject}`);
    console.log(`[MOCK EMAIL] Body: \n${text}`);
    return true;
};

module.exports = {
    generateRandomPassword,
    hashPassword,
    comparePassword,
    sendEmail
};
