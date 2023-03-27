import React, { useState } from 'react';
import NoteForm from './NoteForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

type Todo = {
    id: string;
    text: string;
    isComplete: boolean;
};

type NoteProps = {
    todos: Todo[];
    completeTodo: (id: string) => void;
    removeTodo: (id: string) => void;
    editTodo: (id: string, text: string) => void;
};

const Todo: React.FC<NoteProps> = ({
    todos,
    completeTodo,
    removeTodo,
    editTodo,
}) => {
    const [edit, setEdit] = useState<{ id: string | ''; text: string }>({
        id: '',
        text: '',
    });
    const [editedText, setEditedText] = useState<string>('');

    const handleEditSubmit = (note: { id: string; text: string }) => {
        if (!note.text.trim()) {
            return;
        }
        editTodo(note.id, note.text.trim());
        setEdit({ id: '', text: '' });
    };

    const handleEditCancel = () => {
        setEdit({ id: '', text: '' });
        setEditedText('');
    };

    return (
        <>
            {todos.map((todo) => (
                <div
                    className={`todo-row ${todo.isComplete ? 'complete' : ''}`}
                    key={todo.id}
                >
                    {edit.id === todo.id ? (
                        <NoteForm
                            edit={todo}
                            onSubmit={handleEditSubmit}
                            onCancel={handleEditCancel}
                            buttonText="Save"
                        />

                    ) : (
                        <>
                            <div onClick={() => completeTodo(todo.id)}>{todo.text}</div>
                            <div className="icons">
                                <RiCloseCircleLine
                                    onClick={() => removeTodo(todo.id)}
                                    className="delete-icon"
                                />
                                <TiEdit
                                    onClick={() =>
                                        setEdit({ id: todo.id, text: todo.text })
                                    }
                                    className="edit-icon"
                                />
                            </div>
                        </>
                    )}
                </div>
            ))}
        </>
    );
};

export default Todo;
