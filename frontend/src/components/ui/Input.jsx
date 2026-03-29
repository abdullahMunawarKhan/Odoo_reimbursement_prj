import React from 'react';

const Input = ({ label, type = "text", placeholder, value, onChange, error, className = "", icon: Icon, trailingIcon: TrailingIcon, onTrailingIconClick, ...props }) => {
    return (
        <div className={`mb-4 w-full ${className}`}>
            {label && <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">{label}</label>}
            <div className="relative group flex items-center">
                {Icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors z-10">
                        <Icon size={20} />
                    </div>
                )}
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`bg-slate-900 border ${error ? 'border-rose-500' : 'border-slate-800'} text-white rounded-2xl py-4 ${Icon ? 'pl-12' : 'pl-4'} ${TrailingIcon ? 'pr-12' : 'pr-4'} w-full focus:outline-none focus:ring-2 ${error ? 'focus:ring-rose-500' : 'focus:ring-blue-500'} focus:border-transparent transition-all duration-300 placeholder:text-slate-600 shadow-inner`}
                    {...props}
                />
                {TrailingIcon && (
                    <button 
                        type="button"
                        onClick={onTrailingIconClick}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors z-10 focus:outline-none"
                    >
                        <TrailingIcon size={20} />
                    </button>
                )}
            </div>
            {error && <p className="mt-2 text-rose-500 text-sm font-medium animate-pulse">{error}</p>}
        </div>
    );
};

export default Input;
