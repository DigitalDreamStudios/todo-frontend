import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import TodoForm from '../TodoForm/TodoForm';
import './TodoContainer.css';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../../context/AuthContext';
import { useUser } from '../../../../context/UserContext';
import TodoList from '../TodoList/TodoList';

const TodoContainer: React.FC<{}> = () => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  const auth = useAuth();
  const user = useUser();

  useEffect(() => {
    setToken(auth.token);
    setUserId(user.userData?.userId || null);
  }
    , [auth.token]);

  return (
    <div className='card-container'>
      <div className='card'>
        <h1>What's the Plan for Today?</h1>
        <TodoForm token={token} userId={userId} />
        <TodoList token={token} userId={userId} />
        <ToastContainer />
      </div>
    </div>
  );
};

export default TodoContainer;
