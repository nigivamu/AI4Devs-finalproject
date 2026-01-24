import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import mockApi from '../services/mockApi';
import { Wallet, TrendingUp, PiggyBank, AlertCircle, PlusCircle } from 'lucide-react';

import MonthlyLimit from './MonthlyLimit';
import BudgetProgress from './BudgetProgress';
import ExpenseChart from './ExpenseChart';
import ExpenseInput from './ExpenseInput';
import ExpenseList from './ExpenseList';
import AlertBanner from './AlertBanner';
import StatCard from './StatCard';

const DashboardView = () => {
    const { user, logout } = useAuth();
    const [dashboardData, setDashboardData] = useState({
        monthlyLimit: null,
        totalSpent: 0,
        expenses: [],
        alert: null
    });
    const [loading, setLoading] = useState(true);

    const loadDashboard = async () => {
        try {
            const data = await mockApi.getDashboard();
            setDashboardData(data);
        } catch (error) {
            console.error('Error loading dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDashboard();
    }, []);

    const handleExpenseAdded = (result) => {
        setDashboardData(prev => ({
            ...prev,
            totalSpent: result.totalSpent,
            monthlyLimit: result.monthlyLimit,
            alert: result.alert || prev.alert,
            expenses: [result.expense, ...prev.expenses]
        }));
    };

    const handleLimitSet = (newLimit) => {
        setDashboardData(prev => ({
            ...prev,
            monthlyLimit: newLimit
        }));
    };

    const handleDismissAlert = () => {
        setDashboardData(prev => ({
            ...prev,
            alert: null
        }));
    };

    const remaining = dashboardData.monthlyLimit ? dashboardData.monthlyLimit - dashboardData.totalSpent : 0;
    const savingsRate = dashboardData.monthlyLimit ? ((dashboardData.monthlyLimit - dashboardData.totalSpent) / dashboardData.monthlyLimit) * 100 : 0;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                    <p className="text-slate-600">Cargando...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="bg-primary-100 p-2 rounded-lg">
                                <Wallet className="w-6 h-6 text-primary-600" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">
                                    Control de Gastos
                                </h1>
                                <p className="text-xs text-gray-500">
                                    Bienvenido, {user?.email}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="text-sm text-gray-500 hover:text-gray-800 font-medium transition-colors"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                <AlertBanner
                    alert={dashboardData.alert}
                    onDismiss={handleDismissAlert}
                />

                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        title="Gasto Total"
                        value={formatCurrency(dashboardData.totalSpent)}
                        subValue="Este mes"
                        icon={TrendingUp}
                        color="secondary"
                    />
                    <StatCard
                        title="Presupuesto"
                        value={dashboardData.monthlyLimit ? formatCurrency(dashboardData.monthlyLimit) : 'No definido'}
                        subValue={dashboardData.monthlyLimit ? 'Límite mensual' : <span className="text-orange-500">Definir ahora ↓</span>}
                        icon={Wallet}
                        color="primary"
                    />
                    <StatCard
                        title="Disponible"
                        value={formatCurrency(remaining)}
                        subValue={dashboardData.monthlyLimit ? `${savingsRate.toFixed(0)}% restante` : '-'}
                        icon={PiggyBank}
                        color={remaining < 0 ? 'red' : 'primary'}
                    />
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column (Charts & List) */}
                    <div className="lg:col-span-2 space-y-6">
                        <ExpenseChart expenses={dashboardData.expenses} />

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="font-bold text-gray-800">Movimientos Recientes</h3>
                            </div>
                            <ExpenseList expenses={dashboardData.expenses} />
                        </div>
                    </div>

                    {/* Right Column (Controls & Progress) */}
                    <div className="space-y-6">
                        <ExpenseInput onExpenseAdded={handleExpenseAdded} />

                        <BudgetProgress
                            totalSpent={dashboardData.totalSpent}
                            monthlyLimit={dashboardData.monthlyLimit}
                        />

                        <MonthlyLimit
                            currentLimit={dashboardData.monthlyLimit}
                            onLimitSet={handleLimitSet}
                        />
                    </div>
                </div>
            </main>

            <footer className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-400 text-sm">
                <p>MVP de Seguimiento de Gastos Personales asistido por IA</p>
            </footer>
        </div>
    );
};

export default DashboardView;
