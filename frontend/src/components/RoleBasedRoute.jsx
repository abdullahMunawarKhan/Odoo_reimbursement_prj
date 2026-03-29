import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../store/authStore';

const RoleBasedRoute = ({ allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) return null; // Or a loader

    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        // Rediect to their original dashboard if they try to access unauthorized roles
        const defaultPath = user.role === 'admin' ? '/admin/dashboard' : (user.role === 'manager' ? '/manager/dashboard' : '/employee/dashboard');
        return <Navigate to={defaultPath} replace />;
    }

    return <Outlet />;
};

export default RoleBasedRoute;
