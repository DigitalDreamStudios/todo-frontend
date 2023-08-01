import React, { createContext, useState, useEffect, FC } from 'react';

interface AuthContextType {
    token: string | null;
    checkToken: () => void;
    updateToken: (newToken: string) => void;
    removeToken: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);

    // Validate token in localStorage
    const checkToken = () => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    };

    // Update token when user logs in successfully
    const updateToken = (newToken: string) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    // Remove token when user logs out
    const removeToken = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    // Check token when component is mounted
    useEffect(() => {
        checkToken();
    }, []);

    return (
        <AuthContext.Provider value={{ token, checkToken, updateToken, removeToken }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to get the auth context
const useAuth = () => {
    const authContext = React.useContext(AuthContext);

    if (!authContext) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return authContext;
};

export { AuthProvider, useAuth };
