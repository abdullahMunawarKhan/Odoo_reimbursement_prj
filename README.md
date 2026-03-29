# 🚀 Reimbursement Management System

A robust and transparent solution for managing manual expense reimbursement processes. This project aims to simplify approval flows, multi-level management, and flexible approval rules.

---

## 📝 Problem Statement
Companies often struggle with **manual expense reimbursement processes** that are time-consuming, error-prone, and lack transparency. There is a need for a system that can:
- Define **approval flows** based on thresholds.
- Manage **multi-level approvals**.
- Support **flexible approval rules**.

---

## ✨ Core Features

### 👤 Authentication & User Management
- **One-Click Setup**: On first login/signup, a new Company (with the environment's selected country's currency) and Admin User are auto-created.
- **Role Management**: Admin can create Employees & Managers, assign/change roles, and define manager relationships for employees.

### 💰 Expense Submission (Employee Role)
- **Claim Submission**: Employees can submit claims with details like Amount (supports different currencies), Category, Description, and Date.
- **History Tracking**: Employees can view their complete expense history with status indicators (Approved, Rejected).

### 🪜 Approval Workflow (Manager/Admin Role)
- **Hierarchical Approval**: Expenses are first approved by the direct manager if the `IS MANAGER APPROVER` field is checked.
- **Custom Sequences**: Admin can define multi-step sequences (e.g., Step 1: Manager ➡️ Step 2: Finance ➡️ Step 3: Director).
- **Transparency**: Expenses move to the next approver only after the current one acts.

### ⚙️ Conditional Approval Flow
The system supports complex approval logic:
- **Percentage Rule**: e.g., If 60% of approvers approve, the expense is approved.
- **Specific Approver Rule**: e.g., If CFO approves, the expense is auto-approved.
- **Hybrid Rule**: Combine rules (e.g., 60% OR CFO approves).

---

## 🔐 Roles & Permissions

| Role | Permissions |
| :--- | :--- |
| **Admin** | Create company, manage users, set roles, configure rules, view all expenses, override approvals |
| **Manager** | Approve/reject expenses, view team expenses, escalate as per rules |
| **Employee** | Submit expenses, view own expense history, check approval status |

---

## 🛠️ Additional Features
- **📸 OCR for Receipts**: Automatically read and populate expense fields (Amount, Date, Description, Expense Type, Restaurant Name) by scanning receipts.
- **🌍 Global Support**:
  - Integration with [REST Countries API](https://restcountries.com/v3.1/all?fields=name,currencies) for country/currency data.
  - Integration with [Exchange Rate API](https://api.exchangerate-api.com/v4/latest/{BASE_CURRENCY}) for real-time currency conversions.

---

## 🎨 Design & Mockups
You can view the project mockups here:
👉 [Excalidraw Mockup](https://link.excalidraw.com/l/65VNwvy7c4X/4WSLZDTrhkA)

---

## 🚀 Getting Started
(Instructions for installation and local setup can be added here once the codebase is initialized.)
