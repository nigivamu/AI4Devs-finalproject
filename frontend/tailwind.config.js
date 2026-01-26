/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#ecfdf5', // emerald-50
                    100: '#d1fae5', // emerald-100
                    500: '#10b981', // emerald-500
                    600: '#059669', // emerald-600
                    700: '#047857', // emerald-700
                },
                secondary: {
                    500: '#6366f1', // indigo-500
                    600: '#4f46e5', // indigo-600
                },
                accent: {
                    500: '#f59e0b', // amber-500
                }
            }
        },
    },
    plugins: [],
}
