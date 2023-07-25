import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { TodoService } from '../../services/todo.service';
import TodoForm from '../TodoForm/TodoForm';
import TodoList from '../TodoList/TodoList';
import './TodoContainer.css';
import 'react-toastify/dist/ReactToastify.css';
import { Todo } from '../../interfaces/todo.interface';
import { TodoType } from '../../types/todo.type';

const todoService = new TodoService(); // Create an instance of TodoService

const TodoContainer: React.FC<{}> = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Function to handle form submission
  const onFormSubmit = async (todo: TodoType) => {
    const newTodo = await todoService.addTodo({
      _id: todo._id,
      description: todo.description,
      status: false,
    });

    if (newTodo) {
      // Update the state with the new todo
      setTodos([...todos, newTodo]);
      // Save the todos to sessionStorage
      sessionStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
    }
  };

  // Function to handle completing a todo item
  const onCompleteTodo = async (_id: string) => {
    const updatedTodo = await todoService.completeTodo(_id);

    if (updatedTodo) {
      // Update the state with the updated todo
      const newTodos = todos.map((todo) => (todo._id === _id ? updatedTodo : todo));
      setTodos(newTodos);
      sessionStorage.setItem('todos', JSON.stringify(newTodos));
    }
  };

  // Function to handle removing a todo item
  const onRemoveTodo = async (_id: string) => {
    const removedTodo = await todoService.removeTodo(_id);
    if (removedTodo) {
      // Update the state with the filtered todos
      const newTodos = todos.filter((todo) => todo._id !== _id);
      setTodos(newTodos);
      sessionStorage.setItem('todos', JSON.stringify(newTodos));
    }
  };

  // Function to handle editing a todo item
  const onEditTodo = async (todo: TodoType) => {
    const updatedTodo = await todoService.editTodo({
      _id: todo._id,
      description: todo.description,
      status: todo.status,
    });

    if (updatedTodo) {
      // Update the state with the updated todo
      const newTodos = todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo));
      setTodos(newTodos);
      sessionStorage.setItem('todos', JSON.stringify(newTodos));
    }
  };

  useEffect(() => {
    // Function to fetch todos on component mount
    const fetchData = async () => {
      const todos = await todoService.getTodo();
      setTodos(todos);
      sessionStorage.setItem('todos', JSON.stringify(todos));
    };
    fetchData();
  }, []);

  return (
    <div className='card-container'>
      <div className='card'>
        <h1>What's the Plan for Today?</h1>
        {/* Render the TodoForm component */}
        <TodoForm onSubmit={onFormSubmit} onEdit={onEditTodo} />
        {/* Render the TodoList component */}
        <TodoList
          todos={todos}
          completeTodo={onCompleteTodo}
          removeTodo={onRemoveTodo}
          editTodo={onEditTodo}
        />
        {/* Render the ToastContainer for showing toast messages */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default TodoContainer;
