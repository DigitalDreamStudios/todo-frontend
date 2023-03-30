import React, { useState } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

// Import components
import TodoForm from './TodoForm';

// Import styles
import '../assets/css/list.css'

type Todo = {
    id: string;
    text: string;
    isComplete: boolean;
};

type TodoProps = {
    todos: Todo[];
    completeTodo: (id: string) => void;
    removeTodo: (id: string) => void;
    editTodo: (id: string, text: string) => void;
};

const TodoList: React.FC<TodoProps> = ({
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

    const handleEditSubmit = (Todo: { id: string; text: string }) => {
        if (!Todo.text.trim()) {
            return;
        }
        editTodo(Todo.id, Todo.text.trim());
        setEdit({ id: '', text: '' });
    };

    const handleEditCancel = () => {
        setEdit({ id: '', text: '' });
        setEditedText('');
    };

    return (
        <div className="todo-list">
            <>
                {todos.map((todo) => (
                    <div
                        className={`todo-row ${todo.isComplete ? 'complete' : ''}`}
                        key={todo.id}
                    >
                        {edit.id === todo.id ? (
                            <TodoForm
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
        </div>
    );
};

export default TodoList;
