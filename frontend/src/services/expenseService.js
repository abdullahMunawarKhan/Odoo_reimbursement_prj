import axios from 'axios';

const API_URL = 'http://localhost:5000/api/expenses';

export const getMyExpenses = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const submitExpense = async (expenseData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL, expenseData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// Assuming these will be implemented later
export const getAllExpenses = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/all`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const getTeamExpenses = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/team`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const updateExpenseStatus = async (id, status) => {
    const token = localStorage.getItem('token');
    const response = await axios.patch(`${API_URL}/status/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};
