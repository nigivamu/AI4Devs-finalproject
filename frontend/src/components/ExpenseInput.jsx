import { useState } from 'react';
import mockApi from '../services/mockApi';
import { Send, Sparkles } from 'lucide-react';

const ExpenseInput = ({ onExpenseAdded }) => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const result = await mockApi.addExpense(text);
            setText('');
            setSuccess('Gasto guardado');
            if (onExpenseAdded) {
                onExpenseAdded(result);
            }
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const examplePhrases = [
        'Mercado 45.000',
        'Taxi 12.000',
        'Cine 25.000',
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary-500" />
                    Registrar Gasto
                </h3>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-emerald-50 text-emerald-600 text-sm p-3 rounded-lg mb-4">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="relative">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Ej: Almuerzo 15.000..."
                    className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none text-gray-800 placeholder-gray-400"
                    rows={2}
                    disabled={loading}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e);
                        }
                    }}
                />

                <button
                    type="submit"
                    disabled={loading || !text.trim()}
                    className="absolute right-2 bottom-2 p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        <Send className="w-5 h-5" />
                    )}
                </button>
            </form>

            <div className="mt-3 flex flex-wrap gap-2">
                {examplePhrases.map((phrase, index) => (
                    <button
                        key={index}
                        onClick={() => setText(phrase)}
                        className="text-xs text-gray-500 bg-gray-50 hover:bg-gray-100 border border-gray-100 px-3 py-1.5 rounded-full transition-colors"
                    >
                        {phrase}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ExpenseInput;
