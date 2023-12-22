import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import TodoForm from './components/TodoForm/TodoForm';
import './Todo.css';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import TodoList from './components/TodoList/TodoList';
import { SessionProvider } from './context/SessionContext';

const Todo: React.FC<{}> = () => {
  // Container states
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  // Context hooks
  const { token: authToken } = useAuth();
  const { userData } = useUser();

  useEffect(() => {
    setToken(authToken);
    setUserId(userData?.userId ?? null);
  }, [authToken, userData]);

  return (
    <SessionProvider>
      <div className='card-container'>
        <div className='card'>
          <h1>What's the Plan for Today?</h1>
          <TodoForm token={token} userId={userId} />
          <TodoList token={token} />
          <ToastContainer />
        </div>
      </div>
    </SessionProvider>
  );
};

export default Todo;
