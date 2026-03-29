import React from 'react';

const Input = ({ label, type = "text", placeholder, value, onChange, error, className = "", icon: Icon, ...props }) => {
    return (
        <div className={`mb-4 ${className}`}>
            {label && <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">{label}</label>}
            <div className="relative group">
                {Icon && (
                    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
                )}
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`bg-slate-900 border ${error ? 'border-rose-500' : 'border-slate-800'} text-white rounded-2xl p-4 w-full focus:outline-none focus:ring-2 ${error ? 'focus:ring-rose-500' : 'focus:ring-blue-500'} transition duration-300 ${Icon ? 'pl-12' : ''}`}
                    {...props}
                />
            </div>
            {error && <p className="mt-2 text-rose-500 text-sm font-medium animate-pulse">{error}</p>}
        </div>
    );
};

export default Input;
