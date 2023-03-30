import React, { useState } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { removeTodo, completeTodo, editTodo } from '../common/function';

// Import components
import TodoForm from './TodoForm';

// Import styles
import '../assets/css/list.css'

// Import interfaces
import { TodoProps } from '../interfaces/todo.interface';

// Import types
import { TodoType } from '../types/todo.type';

const TodoList: React.FC<TodoProps> = ({ todos }) => {
    const [edit, setEdit] = useState<TodoType>({
        _id: "",
        description: "",
        status: false
    });

    const handleEditSubmit = (todo: TodoType) => {
        editTodo(todo);
        setEdit({
            _id: "",
            description: "",
            status: false
        });
    };

    const handleEditCancel = () => {
        setEdit({
            _id: "",
            description: "",
            status: false
        });
    };

    return (
        <>
            {todos.map((todo) => (
                <div
                    className={`todo-row ${todo.status ? 'complete' : ''}`}
                    key={todo._id}>
                    {edit._id === todo._id ? (
                        <TodoForm
                            edit={todo}
                            onSubmit={handleEditSubmit}
                            onCancel={handleEditCancel}
                            buttonDescription="Save" />

                    ) : (
                        <>
                            <div onClick={() => completeTodo(todo._id)}>{todo.description}</div>
                            <div className="icons">
                                <RiCloseCircleLine
                                    onClick={() => removeTodo(todo._id)}
                                    className="delete-icon" />
                                <TiEdit
                                    onClick={() =>
                                        setEdit({ _id: todo._id, description: todo.description, status: todo.status })
                                    }
                                    className="edit-icon" />
                            </div>
                        </>
                    )}
                </div>
            ))}
        </>
    );
};

export default TodoList;
