import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-950 to-slate-950 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-20 left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]"></div>

            <div className="w-full max-w-lg z-10 animate-in fade-in slide-in-from-bottom duration-1000">
                <div className="text-center mb-12">
                     <h1 className="text-5xl font-black bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-2">ReimburseIt</h1>
                     <p className="text-slate-500 font-medium">Simplify your business finances in real-time</p>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
