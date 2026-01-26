import { AlertTriangle, X } from 'lucide-react';

const AlertBanner = ({ alert, onDismiss }) => {
    if (!alert) return null;

    return (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6 flex items-start justify-between shadow-sm">
            <div className="flex items-start">
                <div className="flex-shrink-0 bg-orange-100 p-2 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-bold text-orange-800">
                        Límite Mensual Excedido
                    </h3>
                    <div className="mt-1 text-sm text-orange-700">
                        {alert.message}
                    </div>
                </div>
            </div>
            {onDismiss && (
                <button
                    onClick={onDismiss}
                    className="ml-4 flex-shrink-0 text-orange-400 hover:text-orange-600 transition-colors bg-white/50 hover:bg-white rounded-lg p-1"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    );
};

export default AlertBanner;
