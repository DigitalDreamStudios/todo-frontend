import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import uuid from 'react-uuid';

// Import components
import TodoForm from './TodoForm';
import TodoList from './TodoList';

// Import styles
import '../assets/css/card.css';
import 'react-toastify/dist/ReactToastify.css';

interface Todo {
  id: string;
  text: string;
  isComplete: boolean;
}

const TodoContainer: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const addTodo = (todo: { id: string; text: string }) => {
    if (!todo.text.trim()) {
      toast.error(
        'Please enter a valid Todo!', {
        autoClose: 500,
      }
      );
      return;
    }

    const newTodo: Todo = {
      id: uuid(),
      text: todo.text.trim(),
      isComplete: false,
    };

    setTodos([newTodo, ...todos]);

    toast.success(
      'To do added successfully!', {
      autoClose: 500,
    });

    // Add to local storage
    localStorage.setItem('todos', JSON.stringify([newTodo, ...todos]));
  };

  const removeTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));

    // Remove from local storage
    localStorage.setItem('todos', JSON.stringify(todos.filter(todo => todo.id !== id)));
    toast.success(
      'To do removed successfully!', {
      autoClose: 500,
    });
  };

  const completeTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      })
    );
  };

  const editTodo = (id: string, text: string) => {
    setTodos(prev =>
      prev.map(todo => {
        if (todo.id === id) {
          toast.success(
            'To do updated successfully!', {
            autoClose: 500,
          });
          return { ...todo, text: text };
        }
        return todo;
      })
    );

    // Edit in local storage
    localStorage.setItem('todos', JSON.stringify(todos.map(todo => {
      if (todo.id === id)
        return { ...todo, text: text };
      else
        return todo;
    })));
  };

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