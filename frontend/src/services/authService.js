import api from './api';

export const loginUser = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    return res.data;
};

export const signupUser = async (name, email, password, role, company_name) => {
    const endpoint = role === 'admin' ? '/auth/signup' : '/auth/user-signup';
    
    const payload = { name, email, password, role };
    if (role === 'admin') {
        payload.company_name = company_name;
    }
    
    const res = await api.post(endpoint, payload);
    return res.data;
};
