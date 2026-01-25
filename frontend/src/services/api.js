const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// Helper to decode JWT manually to avoid external dependencies
const parseJwt = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
};

let currentUser = null;

// Initialize user from token if exists
const token = localStorage.getItem('token');
if (token) {
    const decoded = parseJwt(token);
    if (decoded) {
        currentUser = { email: decoded.sub };
    }
}

const getHeaders = () => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const token = localStorage.getItem('token');
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

const realApi = {
    // Auth
    login: async (email, password) => {
        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);

        const response = await fetch(`${API_URL}/auth/login/access-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Error en el login');
        }

        const data = await response.json();
        localStorage.setItem('token', data.access_token);

        const decoded = parseJwt(data.access_token);
        currentUser = { email: decoded.sub };

        return { token: data.access_token };
    },

    register: async (email, password) => {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Error en el registro');
        }

        // Auto login after register
        return realApi.login(email, password);
    },

    logout: async () => {
        localStorage.removeItem('token');
        currentUser = null;
        return { success: true };
    },

    getCurrentUser: () => {
        return currentUser;
    },

    // Monthly Limit
    setMonthlyLimit: async (amount) => {
        const response = await fetch(`${API_URL}/monthly-limit/`, { // Note the trailing slash if backend requires it (FastAPI usually optional but strict if defined)
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ amount }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Error al guardar el límite');
        }

        return await response.json();
    },

    // Expenses
    addExpense: async (text) => {
        const response = await fetch(`${API_URL}/expenses`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Error al agregar gasto');
        }

        return await response.json();
    },

    // Dashboard
    getDashboard: async () => {
        const response = await fetch(`${API_URL}/dashboard`, {
            method: 'GET',
            headers: getHeaders(),
        });

        if (!response.ok) {
            if (response.status === 401) {
                // Token expired or invalid
                localStorage.removeItem('token');
                currentUser = null;
                throw new Error('Sesión expirada');
            }
            const error = await response.json();
            throw new Error(error.detail || 'Error al obtener dashboard');
        }

        return await response.json();
    },

    // Helper
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
};

const mockApi = {
    login: async (email, password) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const token = 'mock_token_' + btoa(JSON.stringify({ sub: email }));
                localStorage.setItem('token', token);
                currentUser = { email };
                resolve({ token });
            }, 800);
        });
    },

    register: async (email, password) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockApi.login(email, password));
            }, 800);
        });
    },

    logout: async () => {
        localStorage.removeItem('token');
        currentUser = null;
        return { success: true };
    },

    getCurrentUser: () => currentUser,

    setMonthlyLimit: async (amount) => {
        return new Promise(resolve => setTimeout(() => resolve({ amount }), 500));
    },

    addExpense: async (text) => {
        return new Promise(resolve => setTimeout(() => resolve({
            id: Date.now(),
            text,
            amount: Math.floor(Math.random() * 50000) + 5000,
            date: new Date().toISOString()
        }), 500));
    },

    getDashboard: async () => {
        return new Promise(resolve => setTimeout(() => resolve({
            total_spent: 154000,
            monthly_limit: 1000000,
            recent_expenses: [
                { id: 1, text: 'Supermercado', amount: 85000, date: new Date(Date.now() - 86400000).toISOString() },
                { id: 2, text: 'Gasolina', amount: 45000, date: new Date(Date.now() - 172800000).toISOString() },
                { id: 3, text: 'Cine', amount: 24000, date: new Date(Date.now() - 259200000).toISOString() },
            ]
        }), 800));
    },

    formatCurrency: (amount) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
};

export const api = import.meta.env.VITE_USE_MOCK === 'true' ? mockApi : realApi;

export default api;
