import React from 'react'
import { Outlet } from 'react-router-dom'
import ProtectedRoute from '../../protected/ProcteRoute'

const Main = () => {
    return (
        <ProtectedRoute>
            <Outlet />
        </ProtectedRoute>
    )
}

export default Main