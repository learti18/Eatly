import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';

export default function PublicRoute() {
    const { isAuthenticated, user } = useAuth();

    // If user is authenticated and is a restaurant, redirect to appropriate route
    if (isAuthenticated && user?.roles?.includes("Restaurant")) {
        return <Navigate to="/restaurant-profile" replace />;
    }

    // Allow access to public routes for non-restaurant users
    return <Outlet />;
} 