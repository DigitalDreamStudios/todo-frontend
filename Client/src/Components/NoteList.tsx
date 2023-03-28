import React, { useEffect, useState } from 'react';
import NoteForm from './NoteForm';
import Note from './Note';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uuid from 'react-uuid';

interface Todo {
  id: string;
  text: string;
  isComplete: boolean;
}

const NoteList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const addNote = (todo: { id: string; text: string }) => {
    if (!todo.text.trim()) {
      toast.error('Please enter a valid note!');
      return;
    }

    const newNote: Todo = {
      id: uuid(),
      text: todo.text.trim(),
      isComplete: false,
    };

    setTodos([newNote, ...todos]);

    toast.success('Note added successfully!');

    // Add to local storage
    localStorage.setItem('todos', JSON.stringify([newNote, ...todos]));
  };

  const removeNote = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));

    // Remove from local storage
    localStorage.setItem('todos', JSON.stringify(todos.filter(todo => todo.id !== id)));
    toast.success('Note removed successfully!');
  };

  const completeNote = (id: string) => {
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
        <NoteForm onSubmit={addNote} />
        <Note
          todos={todos}
          completeTodo={completeNote}
          removeTodo={removeNote}
          editTodo={editTodo}
        />
        <ToastContainer />
      </div>
    </div>
  );
};

export default NoteList;