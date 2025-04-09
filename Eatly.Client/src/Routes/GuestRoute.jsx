import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../Hooks/useAuth'
import { STATUS } from '../Utils/AuthStatus'

export default function GuestRoute() {
    const { isAuthenticated, status } = useAuth()
    const location = useLocation()

    if (status === STATUS.PENDING) {
        return (
            // <LoaderBarsSpinner fullscreen />
            <div>
                ...loading
            </div>
        )
    }


    return isAuthenticated ? 
    <Navigate to={location.state?.from?.pathname || '/'} replace /> 
    : 
    <Outlet/>
}
