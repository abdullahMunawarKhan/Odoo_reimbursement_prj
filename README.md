# 🚀 Reimbursement Management System (Odoo-inspired)

[![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Container-Docker-blue?style=for-the-badge&logo=docker)](https://www.docker.com/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS%204-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

A premium, full-stack enterprise solution for managing manual expense reimbursement processes. Designed with high-performance React patterns and a robust Node.js/PostgreSQL architecture.

---

## 🎥 Project Overview
This system simplifies approval flows, multi-level management, and complex business logic for employee reimbursements. It features a unique, high-end dark-themed UI with role-specific dashboards.

### 🎭 3-Role Ecosystem
The interface dynamically morphs based on your organizational role:
- **👤 Employee**: Submit receipts, track status, and view personal history.
- **👨💼 Manager**: Review pending approvals, analyze team spending, and add decision comments.
- **🛡️ Admin**: Manage global identity, configure workflow rules, and audit all expenditures.

---

## ✨ Implemented Core Features

### 🔐 1. Smart Authentication & RBAC
- **JWT-Based Security**: Encrypted session management.
- **Role-Based Access Control (RBAC)**: Strict route protection—Admins can't be spoofed by Employees.
- **Dynamic Redirection**: Immediate routing to role-specific control centers upon login.

### 💰 2. Smart Expense Submissions (Employee)
- **OCR-Ready Uploads**: High-end receipt drop-zones with simulated AI parsing.
- **Multi-Currency Support**: Selective currency inputs for global teams.
- **Real-Time Tracking**: Visual status indicators (Draft ➡️ Pending ➡️ Approved/Rejected).

### 🪜 3. Approval Engine (Manager)
- **Decision Hub**: One-click Approve/Reject interface.
- **Team Analytics**: Performance and compliance tracking.
- **Global Converted View**: Managers see original values vs base currency estimates.

### ⚙️ 4. Identity & Rules (Admin)
- **Identity Hub**: Full CRUD for users with role assignment.
- **Workflow Rules**: Define approval sequences (Percentage-based, Hybrid, or Specific approvers).
- **Global Audit**: Complete transparency over all organizational spending.

---

## 🛠️ Tech Stack & Architecture

### Frontend (Modern React)
- **Framework**: Vite + React 19
- **Styling**: Tailwind CSS 4 (Premium HSL palette)
- **Icons**: Lucide React
- **Navigation**: React Router 7 (Complex nesting & Layouts)
- **State**: React Context API (AuthStore)
- **API**: Axios with Interceptors

### Backend (Robust Node)
- **Engine**: Express.js
- **Auth**: JSON Web Tokens (JWT) & Bcrypt
- **Validation**: Zod
- **Database**: PostgreSQL 15 (Docker)
- **Driver**: `pg` (Pool-based connections)

---

## 📁 Repository Structure
```bash
/
├── backend/                # Express.js Server
│   ├── config/             # DB Connectivity
│   ├── controllers/        # API Business Logic
│   ├── middlewares/        # JWT & RBAC protection
│   ├── models/             # SQL Query Layer
│   ├── routes/             # REST Endpoints
│   └── server.js           # Entry Point
│
├── frontend/               # React (Vite) Client
│   ├── src/
│   │   ├── components/     # UI Kit & Common Layouts
│   │   ├── pages/          # Admin, Manager, Employee-specific views
│   │   ├── services/       # Consolidated API layer
│   │   ├── store/          # Auth Context (Global State)
│   │   └── App.jsx         # Routing & Protection Logic
│
├── docker-compose.yml      # DB Orchestration
└── db.sql                  # Initial Database Schema
```

---

## 🚀 Getting Started

### 1. Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.
- [Node.js](https://nodejs.org/) (v18+) installed.

### 2. Database Setup
Spin up the PostgreSQL container:
```bash
docker-compose up -d
```
*Note: The schema is automatically applied on first run.*

### 3. Backend Setup
```bash
cd backend
npm install
npm run dev
```
*Server runs on: [http://localhost:5000](http://localhost:5000)*

### 4. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*App runs on: [http://localhost:5173](http://localhost:5173)*

---

## 🎨 Design Vision
The application uses a **Slate-950 base** with **Blue-500/Emerald-500 accents**, focusing on maximalist typography and high-contrast dashboard elements to ensure clarity for financial auditors.

---

## 🤝 Contribution
This project was built as a solution for complex reimbursement workflows.
Developed by [Your Name/Team]
