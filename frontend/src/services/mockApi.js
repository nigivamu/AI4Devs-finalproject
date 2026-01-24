// Mock API service to simulate backend functionality
// This simulates the API endpoints defined in docs/04 contrato.md

// Mock data storage (simulating database)
const mockData = {
    users: [],
    currentUser: null,
    monthlyLimits: {},
    expenses: [],
    alerts: {}
};

// Helper to generate IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Helper to get current month in YYYY-MM format
const getCurrentMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

// Helper to get today's date in YYYY-MM-DD format
const getTodayDate = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

// Simulate AI extraction from natural language
const mockAIExtraction = (text) => {
    // Simple regex-based extraction for demo purposes
    const amountMatch = text.match(/(\d+[\d,.]*)/);
    const amount = amountMatch ? parseFloat(amountMatch[1].replace(/,/g, '')) : null;

    // Simple category inference
    let category = 'General';
    const lowerText = text.toLowerCase();
    if (lowerText.includes('mercado') || lowerText.includes('comida') || lowerText.includes('alimento')) {
        category = 'Alimentación';
    } else if (lowerText.includes('transporte') || lowerText.includes('gasolina') || lowerText.includes('uber') || lowerText.includes('taxi')) {
        category = 'Transporte';
    } else if (lowerText.includes('cine') || lowerText.includes('entretenimiento') || lowerText.includes('juego')) {
        category = 'Entretenimiento';
    } else if (lowerText.includes('ropa') || lowerText.includes('zapato') || lowerText.includes('vestido')) {
        category = 'Ropa';
    } else if (lowerText.includes('salud') || lowerText.includes('medic') || lowerText.includes('farmacia')) {
        category = 'Salud';
    } else if (lowerText.includes('casa') || lowerText.includes('hogar') || lowerText.includes('mueble')) {
        category = 'Hogar';
    }

    // Generate description
    const description = text.replace(/\d+[\d,.]*/g, '').trim() || 'Gasto registrado';

    return {
        amount,
        category,
        expense_date: getTodayDate(),
        description
    };
};

// Simulate AI alert generation
const mockAIAlert = (monthlyLimit, totalSpent, lastExpense) => {
    const exceeded = totalSpent - monthlyLimit;
    return `Has superado tu tope mensual de ${formatCurrency(monthlyLimit)}. Con el último gasto en ${lastExpense.category}, tu total del mes llegó a ${formatCurrency(totalSpent)}. Revisa tus gastos para evitar excederte más este mes.`;
};

// Helper to format currency
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

// API Methods
export const mockApi = {
    // POST /auth/register
    register: async (email, password) => {
        await new Promise(resolve => setTimeout(resolve, 500));

        if (!email || !email.includes('@')) {
            throw new Error('Email inválido');
        }
        if (!password || password.length < 6) {
            throw new Error('La contraseña debe tener al menos 6 caracteres');
        }

        const existingUser = mockData.users.find(u => u.email === email);
        if (existingUser) {
            throw new Error('El email ya está registrado');
        }

        const user = {
            id: generateId(),
            email,
            password,
            createdAt: new Date().toISOString()
        };

        mockData.users.push(user);
        return { token: 'mock-jwt-token-' + user.id };
    },

    // POST /auth/login
    login: async (email, password) => {
        await new Promise(resolve => setTimeout(resolve, 500));

        const user = mockData.users.find(u => u.email === email && u.password === password);
        if (!user) {
            throw new Error('Credenciales inválidas');
        }

        mockData.currentUser = user;
        return { token: 'mock-jwt-token-' + user.id };
    },

    // POST /monthly-limit
    setMonthlyLimit: async (amount) => {
        await new Promise(resolve => setTimeout(resolve, 300));

        if (!amount || amount <= 0) {
            throw new Error('El tope debe ser un valor positivo');
        }

        const month = getCurrentMonth();
        const userId = mockData.currentUser?.id;

        if (!userId) {
            throw new Error('Usuario no autenticado');
        }

        mockData.monthlyLimits[`${userId}-${month}`] = {
            id: generateId(),
            userId,
            month,
            amount,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        return { success: true };
    },

    // POST /expenses
    addExpense: async (text) => {
        await new Promise(resolve => setTimeout(resolve, 800));

        if (!text || text.trim() === '') {
            throw new Error('El texto no puede estar vacío');
        }

        const userId = mockData.currentUser?.id;
        if (!userId) {
            throw new Error('Usuario no autenticado');
        }

        // Simulate AI extraction
        const extracted = mockAIExtraction(text);

        if (!extracted.amount || extracted.amount <= 0) {
            throw new Error('No se pudo identificar un monto válido en el texto');
        }

        const expense = {
            id: generateId(),
            userId,
            amount: extracted.amount,
            category: extracted.category,
            description: extracted.description,
            expenseDate: extracted.expense_date,
            createdAt: new Date().toISOString()
        };

        mockData.expenses.push(expense);

        // Calculate total spent for the month
        const month = getCurrentMonth();
        const userExpenses = mockData.expenses.filter(
            e => e.userId === userId && e.expenseDate.startsWith(month)
        );
        const totalSpent = userExpenses.reduce((sum, e) => sum + e.amount, 0);

        // Check if limit is exceeded
        const limitKey = `${userId}-${month}`;
        const monthlyLimit = mockData.monthlyLimits[limitKey];
        let alert = null;

        if (monthlyLimit && totalSpent > monthlyLimit.amount) {
            // Check if alert already exists for this month
            if (!mockData.alerts[limitKey]) {
                mockData.alerts[limitKey] = {
                    message: mockAIAlert(monthlyLimit.amount, totalSpent, expense)
                };
                alert = mockData.alerts[limitKey];
            } else {
                alert = mockData.alerts[limitKey];
            }
        }

        return {
            expense,
            totalSpent,
            monthlyLimit: monthlyLimit?.amount || null,
            alert
        };
    },

    // GET /dashboard
    getDashboard: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));

        const userId = mockData.currentUser?.id;
        if (!userId) {
            throw new Error('Usuario no autenticado');
        }

        const month = getCurrentMonth();

        // Get monthly limit
        const limitKey = `${userId}-${month}`;
        const monthlyLimit = mockData.monthlyLimits[limitKey];

        // Get expenses for the month
        const userExpenses = mockData.expenses.filter(
            e => e.userId === userId && e.expenseDate.startsWith(month)
        ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const totalSpent = userExpenses.reduce((sum, e) => sum + e.amount, 0);

        // Get alert if exists
        const alert = mockData.alerts[limitKey] || null;

        return {
            monthlyLimit: monthlyLimit?.amount || null,
            totalSpent,
            expenses: userExpenses,
            alert
        };
    },

    // Helper: logout
    logout: async () => {
        mockData.currentUser = null;
        return { success: true };
    },

    // Helper: get current user
    getCurrentUser: () => {
        return mockData.currentUser;
    },

    // Helper: format currency
    formatCurrency
};

export default mockApi;
