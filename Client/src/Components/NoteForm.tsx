import React, { useState, useEffect, useRef, FormEvent } from 'react';
import uuid from 'react-uuid';

interface NoteFormProps {
  edit?: { id: string; text: string };
  onSubmit: (note: { id: string; text: string }) => void;
  onCancel?: () => void;
  buttonText?: string;
}

const NoteForm: React.FC<NoteFormProps> = ({ edit, onSubmit }) => {
  const [input, setInput] = useState<string>(edit?.text || '');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // If its a new note, create a new note
    if (!edit) {
      onSubmit({
        id: uuid(),
        text: input,
      });
    } else {
      // If its an existing note, update the note
      onSubmit({
        id: edit.id,
        text: input,
      });
    }

    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='todo-input edit'
          />
          <button className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Add a todo'
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input'
            ref={inputRef}
          />
          <button className='todo-button'>
            Add todo
          </button>
        </>
      )}
    </form>
  );
};

export default NoteForm;