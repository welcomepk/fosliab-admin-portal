import { useSessionStorage } from "../hooks/use-session-storage"

import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';


const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useSessionStorage("loggedIn", false);
    const [user, setUser] = useSessionStorage("user", null);
    const [authToken, setAuthToken] = useSessionStorage("token", null);

    const navigate = useNavigate();

    const login = (token, user) => {
        setAuthToken(token);
        setIsAuthenticated(true);
        setUser(user);
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        setAuthToken(null);
        localStorage.clear();
        navigate('/login', { replace: true });
    };

    return (
        <AuthContext.Provider value={{ user, authToken, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};