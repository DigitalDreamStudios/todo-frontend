import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

import TodoForm from './TodoForm';
import TodoList from './TodoList';

import '../assets/css/card.css';
import 'react-toastify/dist/ReactToastify.css';

import { Todo } from '../interfaces/todo.interface';
import { getTodo, removeTodo, completeTodo, editTodo, addTodo } from '../common/REST';
import { TodoType } from '../types/todo.type';

const TodoContainer: React.FC<{}> = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const onFormSubmit = async (todo: TodoType) => {
    const newTodo = await addTodo({
      _id: todo._id,
      description: todo.description,
      status: false,
    });

    if (newTodo) {
      setTodos([...todos, newTodo]);
      sessionStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const todos = await getTodo();
      setTodos(todos);
      sessionStorage.setItem('todos', JSON.stringify(todos));
    };
    fetchData();
  }, []);

  return (
    <div className='card-container'>
      <div className='card'>
        <h1>What's the Plan for Today?</h1>
        <TodoForm onSubmit={onFormSubmit} />
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