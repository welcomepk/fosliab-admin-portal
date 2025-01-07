import { useAuth } from "../context/authProvider"
import { Outlet, Navigate } from "react-router";

function ProtectedDashboardLayout() {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }
    return (
        <Outlet />
    )
}

export default ProtectedDashboardLayout