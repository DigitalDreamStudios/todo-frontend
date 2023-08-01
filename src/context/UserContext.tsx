import React, { createContext, useState, useEffect, FC } from 'react';
import jwt_decode from 'jwt-decode';

// Tipo para los datos del usuario extraídos del JWT
interface UserData {
    username: string;
    userId: number;
}

// Tipo para el contexto del usuario
interface UserContextType {
    userData: UserData | null;
}

// Crea el contexto del usuario
const UserContext = createContext<UserContextType | null>(null);

// Props para el componente UserProvider
interface UserProviderProps {
    children: React.ReactNode;
}

// Crea el componente UserProvider
const UserProvider: FC<UserProviderProps> = ({ children }) => {
    const [userData, setUserData] = useState<UserData | null>(null);

    // Valida el token en localStorage y extrae los datos del usuario si está logeado
    const checkToken = () => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            const decodedToken: any = getDecodedAccessToken(storedToken);
            
            if (decodedToken) {
                setUserData({
                    username: decodedToken.username,
                    userId: decodedToken.sub,
                });
            }
        }
    };

    // Función para decodificar el token JWT
    function getDecodedAccessToken(token: string): any {
        try {
            return jwt_decode(token);
        } catch (Error) {
            return null;
        }
    }

    // Comprueba el token cuando se monta el componente
    useEffect(() => {
        checkToken();
    }, []);

    return (
        <UserContext.Provider value={{ userData }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook para obtener el contexto del usuario
const useUser = () => {
    const userContext = React.useContext(UserContext);

    if (!userContext) {
        throw new Error('useUser must be used within a UserProvider');
    }

    return userContext;
};

export { UserProvider, useUser };
