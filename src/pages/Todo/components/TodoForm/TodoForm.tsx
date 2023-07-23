import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { TodoFormProps } from '../../interfaces/todo.interface';
import './TodoForm.css';

const TodoForm: React.FC<TodoFormProps> = ({ edit, onSubmit, onCancel, onEdit, buttonDescription = 'Save' }) => {
  const [description, setDescription] = useState<string>(edit?.description || '');

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input field on component mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!edit) {
      const newTodo = {
        description,
        status: false,
      };
      onSubmit?.(newTodo);
      setDescription('');
    } else {
      const updatedTodo = {
        _id: edit._id,
        description,
        status: edit.status,
      };
      onEdit?.(updatedTodo);
      onSubmit?.({ description: '', status: false });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {edit ? (
        // Render edit form
        <>
          <input
            type="text"
            placeholder="Update your todo"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            ref={inputRef}
            className="todo-input edit"
          />
          <button type="submit" className="todo-button edit">
            {buttonDescription}
          </button>
          {/* Show cancel button when editing */}
          <button type="button" onClick={onCancel} className="todo-button cancel">
            Cancel
          </button>
        </>
      ) : (
        // Render add form
        <>
          <input
            type="text"
            placeholder="Add a todo"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            ref={inputRef}
            className="todo-input"
          />
          <button type="submit" className="todo-button">
            Add todo
          </button>
        </>
      )}
    </form>
  );
};

export default TodoForm;
