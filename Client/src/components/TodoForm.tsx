import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { TodoFormProps, Todo } from '../interfaces/todo.interface';
import { addTodo, editTodo } from '../common/function';

import '../assets/css/form.css'

const TodoForm: React.FC<TodoFormProps> = ({ edit, onSubmit, onCancel, buttonDescription }) => {
  const [description, setDescription] = useState(edit ? edit.description : '');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!edit) {
      const newTodo = {
        description: description,
        status: false
      }
      addTodo(newTodo);
      setDescription('');
    } else {
      const updatedTodo = {
        description: description,
        status: edit.status
      }
      editTodo(updatedTodo);
      onSubmit({
        description: '',
        status: false
      });
    }
  };

  const handleEditSubmit = (todo: Todo) => {
    editTodo(todo);
    onSubmit(todo);
  };

  const handleEditCancel = () => {
    onCancel?.();
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {edit ? (
        <>
          <input
            type="text"
            placeholder="Update your todo"
            value={description}
            onChange={e => setDescription(e.target.value)}
            ref={inputRef}
            className="todo-input edit" />
          <button className="todo-button edit">{buttonDescription}</button>
          <button
            type="button"
            className="todo-button cancel"
            onClick={handleEditCancel}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Add a todo"
            value={description}
            onChange={e => setDescription(e.target.value)}
            ref={inputRef}
            className="todo-input" />
          <button className="todo-button">Add todo</button>
        </>
      )}
    </form>
  );
};

export default TodoForm;
