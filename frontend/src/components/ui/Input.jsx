import React from 'react';

const Input = ({ label, type = "text", placeholder, value, onChange, error, className = "", icon: Icon, trailingIcon: TrailingIcon, onTrailingIconClick, ...props }) => {
    return (
        <div className={`mb-4 w-full ${className}`}>
            {label && <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-1.5 px-0.5">{label}</label>}
            <div className="relative group flex items-center">
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] group-focus-within:text-[#4F46E5] transition-colors z-10">
                        <Icon size={18} />
                    </div>
                )}
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`bg-white border ${error ? 'border-red-400' : 'border-[#E5E7EB]'} text-[#111827] rounded-lg py-3 ${Icon ? 'pl-10' : 'pl-3'} ${TrailingIcon ? 'pr-10' : 'pr-3'} w-full focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-300' : 'focus:ring-[#4F46E5]/30'} focus:border-[#4F46E5] transition-all duration-200 placeholder:text-[#D1D5DB] text-sm`}
                    {...props}
                />
                {TrailingIcon && (
                    <button
                        type="button"
                        onClick={onTrailingIconClick}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] transition-colors z-10 focus:outline-none"
                    >
                        <TrailingIcon size={18} />
                    </button>
                )}
            </div>
            {error && <p className="mt-1 text-red-500 text-xs font-medium">{error}</p>}
        </div>
    );
};

export default Input;
