import React, { useEffect, useState } from 'react'
import { useAuth } from '../Hooks/useAuth'
import { Outlet, useLocation } from 'react-router-dom'
import { STATUS } from '../Utils/AuthStatus'

export default function AdminRoute() {
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


    return  <Outlet/> 
    
}
