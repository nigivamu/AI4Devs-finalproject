import React, { useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const ExpenseChart = ({ expenses }) => {
    const data = useMemo(() => {
        if (!expenses || expenses.length === 0) return [];

        // Group by date
        const grouped = expenses.reduce((acc, expense) => {
            const date = expense.expenseDate;
            if (!acc[date]) {
                acc[date] = 0;
            }
            acc[date] += Number(expense.amount);
            return acc;
        }, {});

        // Convert to array and sort by date (last 7 entries or all)
        const sortedDates = Object.keys(grouped).sort();
        const displayDates = sortedDates.slice(-7); // Show last 7 active days

        return displayDates.map(date => {
            const [year, month, day] = date.split('-');
            return {
                date: `${day}/${month}`,
                fullDate: date,
                amount: grouped[date]
            };
        });
    }, [expenses]);

    const formatCurrency = (val) => {
        if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
        if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`;
        return val;
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-lg">
                    <p className="text-sm font-medium text-gray-800 mb-1">{label}</p>
                    <p className="text-sm font-bold text-primary-600">
                        {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(payload[0].value)}
                    </p>
                </div>
            );
        }
        return null;
    };

    if (data.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 h-80 flex items-center justify-center">
                <p className="text-gray-400 text-sm">No hay datos suficientes para la gráfica</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-gray-700 font-bold mb-6">Evolución de Gastos (Últimos días)</h3>
            <div className="h-64 w-full" style={{ minHeight: '1px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            tickFormatter={formatCurrency}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                        <Bar
                            dataKey="amount"
                            fill="#10b981"
                            radius={[4, 4, 0, 0]}
                            barSize={32}
                            activeBar={{ fill: '#059669' }}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ExpenseChart;
