import { useState, useEffect } from 'react';
import api from '../services/api';
import { Target, Edit2, Check, X } from 'lucide-react';

const MonthlyLimit = ({ currentLimit, onLimitSet }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentLimit) {
            setAmount(currentLimit.toString());
        }
    }, [currentLimit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const numAmount = parseFloat(amount);
            if (!numAmount || numAmount <= 0) return;

            await api.setMonthlyLimit(numAmount);
            setIsEditing(false);
            if (onLimitSet) {
                onLimitSet(numAmount);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between h-auto">
            {!isEditing ? (
                <div className="flex items-center justify-between w-full">
                    <div>
                        <h3 className="text-gray-500 text-sm font-medium mb-1">Tope Mensual</h3>
                        <p className="text-xl font-bold text-gray-900">
                            {currentLimit ? api.formatCurrency(currentLimit) : 'No definido'}
                        </p>
                    </div>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                        <Edit2 className="w-5 h-5" />
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="w-full">
                    <label className="text-xs text-gray-500 font-medium mb-1 block">Nuevo Tope</label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                            placeholder="0"
                            autoFocus
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                        >
                            <Check className="w-4 h-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default MonthlyLimit;
