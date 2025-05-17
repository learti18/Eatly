import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';
import { useRestaurantByUserId } from '../Queries/Restaurants/useRestaurantByUserId';

export default function PublicRoute() {
    const { isAuthenticated, user } = useAuth();
    const { data: restaurant, isLoading } = useRestaurantByUserId();

    // If user is authenticated and is a restaurant, redirect to appropriate route
    if (isAuthenticated && user?.roles?.includes("Restaurant")) {
        if (isLoading) {
            return (
                <div className="flex justify-center items-center h-screen">
                    <span className="loading loading-spinner loading-xl"></span>
                </div>
            );
        }

        if (!restaurant) {
            return <Navigate to="/restaurant-profile" replace />;
        }

        if (!restaurant.isVerified) {
            return <Navigate to="/restaurant-verification" replace />;
        }

        return <Navigate to="/restaurant-dashboard" replace />;
    }

    // If user is authenticated and is an admin, redirect to admin dashboard
    if (isAuthenticated && user?.roles?.includes("Admin")) {
        return <Navigate to="/dashboard" replace />;
    }

    // Allow access to public routes for non-restaurant and non-admin users
    return <Outlet />;
} 