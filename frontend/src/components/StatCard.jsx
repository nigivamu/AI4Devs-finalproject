import React from 'react';


const StatCard = ({ title, value, subValue, icon: Icon, color = 'primary' }) => {
    const colorClasses = {
        primary: 'bg-primary-50 text-primary-600',
        secondary: 'bg-secondary-50 text-secondary-600',
        accent: 'bg-accent-50 text-accent-500',
        red: 'bg-red-50 text-red-600',
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all hover:shadow-md">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
                    <div className="text-2xl font-bold text-gray-800">{value}</div>
                    {subValue && (
                        <p className="text-sm text-gray-500 mt-1">{subValue}</p>
                    )}
                </div>
                <div className={`p-3 rounded-lg ${colorClasses[color] || colorClasses.primary}`}>
                    {Icon && <Icon className="w-6 h-6" />}
                </div>
            </div>
        </div>
    );
};

export default StatCard;
