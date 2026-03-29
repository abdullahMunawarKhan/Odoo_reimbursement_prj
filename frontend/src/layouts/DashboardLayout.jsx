import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import { useAuth } from '../store/authStore';

const DashboardLayout = () => {
    const { user, loading } = useAuth();

    if (loading) return null;

    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#F9FAFB] font-sans" style={{color: '#111827'}}>
            <Navbar user={user} />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar userRole={user.role} />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 transition-all duration-300">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
