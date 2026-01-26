import api from '../services/api';
import { Calendar } from 'lucide-react';

const ExpenseList = ({ expenses }) => {
    if (!expenses || expenses.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">📭</span>
                </div>
                <h3 className="text-gray-900 font-medium mb-1">Sin gastos registrados</h3>
                <p className="text-gray-500 text-sm">
                    Tus movimientos del mes aparecerán aquí.
                </p>
            </div>
        );
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-CO', {
            day: 'numeric',
            month: 'short'
        });
    };

    const getCategoryIcon = (category) => {
        const icons = {
            'Alimentación': '🍔',
            'Transporte': '🚗',
            'Entretenimiento': '🎬',
            'Ropa': '👕',
            'Salud': '💊',
            'Hogar': '🏠',
            'General': '💰'
        };
        return icons[category] || '💰';
    };

    return (
        <div className="bg-white">
            <div className="divide-y divide-gray-100">
                {expenses.map((expense) => (
                    <div
                        key={expense.id}
                        className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                                {getCategoryIcon(expense.category)}
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">{expense.description}</p>
                                <div className="flex items-center text-xs text-gray-500 mt-0.5 space-x-2">
                                    <span className="bg-slate-100 px-2 py-0.5 rounded text-gray-600 font-medium">
                                        {expense.category}
                                    </span>
                                    <span className="flex items-center">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        {formatDate(expense.expenseDate)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="font-bold text-gray-900">
                            {api.formatCurrency(expense.amount)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpenseList;
