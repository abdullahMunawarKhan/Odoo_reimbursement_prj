/*
DATABASE SCHEMA FOR REIMBURSEMENT MANAGEMENT SYSTEM
*/

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Companies Table
CREATE TABLE IF NOT EXISTS companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    uuid UUID UNIQUE DEFAULT uuid_generate_v4(),
    base_currency VARCHAR(10) DEFAULT 'USD',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) CHECK (role IN ('admin', 'manager', 'employee')),
    company_id INTEGER REFERENCES companies(id) ON DELETE SET NULL,
    manager_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    designation VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Auth Whitelist Table
CREATE TABLE IF NOT EXISTS auth_whitelist (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) CHECK (role IN ('admin', 'manager', 'employee')),
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    invited_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'active')),
    invite_token UUID UNIQUE DEFAULT uuid_generate_v4(),
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Expenses Table
CREATE TABLE IF NOT EXISTS expenses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(15, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('draft', 'pending', 'approved', 'rejected')),
    receipt_url TEXT,
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Approval Rules Table
CREATE TABLE IF NOT EXISTS approval_rules (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    rule_type VARCHAR(50) CHECK (rule_type IN ('percentage', 'specific', 'hybrid')),
    value DECIMAL(15, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Approvals Table
CREATE TABLE IF NOT EXISTS approvals (
    id SERIAL PRIMARY KEY,
    expense_id INTEGER REFERENCES expenses(id) ON DELETE CASCADE,
    approver_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(50) CHECK (status IN ('pending', 'approved', 'rejected')),
    comments TEXT,
    sequence INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
