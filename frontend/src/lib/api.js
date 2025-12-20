import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

const api = axios.create({
    baseURL: API_URL,
});

// Add token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
});

// Auth APIs
export const auth = {
    register: (username, password) =>
        api.post('/auth/register', { username, password }),
    login: (username, password) =>
        api.post('/auth/login', { username, password }),
    getCurrentUser: () =>
        api.get('/auth/me'),
};

// Stock APIs
export const stock = {
    getAll: () =>
        api.get('/stock'),
    create: (name, unit, notes) =>
        api.post('/stock', { name, unit, notes }),
    update: (stockId, type, quantity, remarks) =>
        api.post('/stock/transaction', { stockId, type, quantity, remarks }),
    getHistory: (stockId = null) =>
        api.get(`/stock/history${stockId ? `?stockId=${stockId}` : ''}`),
    updateTransaction: (id, quantity, remarks) =>
        api.put(`/stock/transaction/${id}`, { quantity, remarks }),
    deleteTransaction: (id) =>
        api.delete(`/stock/transaction/${id}`),
};

// Account APIs
export const accounts = {
    getTransactions: () =>
        api.get('/accounts'),
    create: (data) =>
        api.post('/accounts', data),
    getSummary: () =>
        api.get('/accounts/summary'),
    delete: (id) =>
        api.delete(`/accounts/${id}`),
    update: (id, data) =>
        api.put(`/accounts/${id}`, data),
};

// Todo APIs
export const todos = {
    getAll: () =>
        api.get('/todos'),
    create: (task, expectedCompletionDate) =>
        api.post('/todos', { task, expectedCompletionDate }),
    update: (id, data) =>
        api.put(`/todos/${id}`, data),
    delete: (id) =>
        api.delete(`/todos/${id}`),
};

// Credit APIs (Pending Payments)
export const credits = {
    getAll: () =>
        api.get('/credits'),
    create: (data) =>
        api.post('/credits', data),
    update: (id, data) =>
        api.put(`/credits/${id}`, data),
    delete: (id) =>
        api.delete(`/credits/${id}`),
};

export default api;
