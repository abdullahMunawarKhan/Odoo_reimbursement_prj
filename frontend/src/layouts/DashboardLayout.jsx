import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import { useAuth } from '../store/authStore';

const DashboardLayout = () => {
    const { user, loading } = useAuth();

    if (loading) return null; // Or a loader

    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    return (
        <div className="flex flex-col min-h-screen bg-slate-950 font-sans selection:bg-blue-500/30 selection:text-white">
            <Navbar user={user} />
            <div className="flex flex-1 overflow-hidden relative">
                {/* Visual accents */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>

                <Sidebar userRole={user.role} />

                <main className="flex-1 overflow-y-auto p-4 md:p-8 relative z-10 transition-all duration-500">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
