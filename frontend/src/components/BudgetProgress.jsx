import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const BudgetProgress = ({ totalSpent, monthlyLimit }) => {
    const percentage = monthlyLimit ? Math.min(Math.round((totalSpent / monthlyLimit) * 100), 100) : 0;
    const remaining = monthlyLimit ? Math.max(monthlyLimit - totalSpent, 0) : 0;

    // Color logic based on percentage
    let color = '#10b981'; // Green (Safe)
    if (percentage > 70) color = '#f59e0b'; // Orange (Warning)
    if (percentage > 90) color = '#ef4444'; // Red (Danger)

    const data = [
        { name: 'Gastado', value: totalSpent, color: color },
        { name: 'Restante', value: remaining, color: '#e2e8f0' } // Slate-200
    ];

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(val);
    };

    if (!monthlyLimit) {
        return (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col items-center justify-center text-center h-full">
                <div className="bg-gray-100 p-4 rounded-full mb-3">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="text-gray-800 font-medium mb-1">Sin Presupuesto</h3>
                <p className="text-gray-500 text-sm">Define un límite mensual para ver tu progreso.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-gray-700 font-bold mb-4">Progreso del Mes</h3>

            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="relative w-40 h-40" style={{ minHeight: '160px', minWidth: '160px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={70}
                                startAngle={90}
                                endAngle={-270}
                                dataKey="value"
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-2xl font-bold text-gray-800">{percentage}%</span>
                        <span className="text-xs text-gray-500">Usado</span>
                    </div>
                </div>

                <div className="mt-6 md:mt-0 md:ml-6 flex-1 space-y-4 w-full">
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-500">Gastado</span>
                            <span className="font-semibold text-gray-800">{formatCurrency(totalSpent)}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                                className="h-2 rounded-full transition-all duration-500"
                                style={{ width: `${percentage}%`, backgroundColor: color }}
                            ></div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-500">Límite Mensual</span>
                            <span className="font-semibold text-gray-800">{formatCurrency(monthlyLimit)}</span>
                        </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600">Disponible</span>
                            <span className={`text-lg font-bold ${remaining < 0 ? 'text-red-500' : 'text-primary-600'}`}>
                                {formatCurrency(remaining)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BudgetProgress;
