import React, { createContext, useState, FC } from 'react';
import { Todo } from '../models/Todo.type';
import { getSessionStorageTodos } from '../helpers/Storage.helper';

interface SessionContextType {
    todos: Todo[];
    updateTodos: () => void;
}

const SessionContext = createContext<SessionContextType | null>(null);

interface SessionProviderProps {
    children: React.ReactNode;
}

const SessionProvider: FC<SessionProviderProps> = ({ children }) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    // Update todos in sessionStorage
    const updateTodos = () => {
        const newTodos = getSessionStorageTodos()
        setTodos(newTodos);
    };

    return (
        <SessionContext.Provider value={{ todos, updateTodos }}>
            {children}
        </SessionContext.Provider>
    );
}

// Custom hook to get the auth context
const useSession = () => {
    const sessionContext = React.useContext(SessionContext);

    if (!sessionContext) {
        throw new Error('useSession must be used within an SessionProvider');
    }

    return sessionContext;
}

export { SessionProvider, useSession };