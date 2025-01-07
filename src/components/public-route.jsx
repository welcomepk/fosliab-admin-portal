import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/context/authProvider';

const PublicRoute = () => {
    const { isAuthenticated } = useAuth();
    if (isAuthenticated) {
        return <Navigate to="/dashboard" />
    }
    return <Outlet />
}

export default PublicRoute