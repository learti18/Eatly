import React, { useEffect, useState } from 'react'
import { useAuth } from '../Hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { STATUS } from '../Utils/AuthStatus'

export default function ProtectedRoute() {
    const { isAuthenticated, status } = useAuth()
    
    const location = useLocation()

    const [authChecked, setAuthChecked] = useState(false)

    useEffect(() => {
        if(status !== STATUS.PENDING){
            setAuthChecked(true)
        }
    }, [status])

    if(status === STATUS.PENDING || !authChecked){
        return (
            // <LoaderBarsSpinner fullscreen />
            <div>loading...</div>
        )
    }

    return isAuthenticated ? <Outlet/> : <Navigate to="/sign-in" state={{ from: location }} replace/>
}
