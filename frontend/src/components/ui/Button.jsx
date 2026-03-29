import React from 'react';

const Button = ({ children, onClick, type = "button", variant = "primary", className = "", disabled = false, ...props }) => {
    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30",
        secondary: "bg-slate-700 hover:bg-slate-600 text-white",
        emerald: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/30",
        rose: "bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-500/30",
        outline: "bg-transparent border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800",
        ghost: "bg-transparent text-slate-400 hover:text-white"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`px-6 py-3 rounded-xl font-bold transition duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
