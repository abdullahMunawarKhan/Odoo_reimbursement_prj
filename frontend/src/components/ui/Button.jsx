import React from 'react';

const Button = ({ children, onClick, type = "button", variant = "primary", className = "", disabled = false, ...props }) => {
    const variants = {
        primary: "bg-[#4F46E5] hover:bg-[#4338CA] text-white shadow-sm",
        secondary: "bg-[#F9FAFB] hover:bg-[#F3F4F6] text-[#374151] border border-[#E5E7EB]",
        emerald: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm",
        rose: "bg-red-500 hover:bg-red-600 text-white shadow-sm",
        outline: "bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] text-[#6B7280] hover:text-[#111827]",
        ghost: "bg-transparent text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB]"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
