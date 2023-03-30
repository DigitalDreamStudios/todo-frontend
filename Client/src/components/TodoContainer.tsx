import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

import TodoForm from './TodoForm';
import TodoList from './TodoList';

import '../assets/css/card.css';
import 'react-toastify/dist/ReactToastify.css';

import { Todo } from '../interfaces/todo.interface';
import { removeTodo, completeTodo, editTodo, addTodo } from '../common/REST';

const TodoContainer: React.FC<{}> = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    axios.get('/api/getall')
      .then(res => {
        sessionStorage.setItem('todos', JSON.stringify(res.data));
        setTodos(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className='card-container'>
      <div className='card'>
        <h1>What's the Plan for Today?</h1>
        <TodoForm onSubmit={addTodo} />
        <TodoList
          todos={todos}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          editTodo={editTodo}
        />
        <ToastContainer />
      </div>
    </div>
  );
};

export default TodoContainer;