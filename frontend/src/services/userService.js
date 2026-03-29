import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export const getUsers = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const createInvite = async (userData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/create`, userData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};
