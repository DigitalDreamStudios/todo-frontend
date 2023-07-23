import React, { useState } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import TodoForm from '../TodoForm/TodoForm';
import './TodoList.css';
import { TodoType, TodoProps } from '../../types/todo.type';

const TodoList: React.FC<TodoProps> = ({ todos, completeTodo, removeTodo, editTodo }) => {
    const [edit, setEdit] = useState<TodoType>({
        _id: '',
        description: '',
        status: false,
    });

    const handleEditSubmit = async (todo: TodoType) => {
        // Clear the edit state after submitting the edited todo
        setEdit({
            _id: '',
            description: '',
            status: false,
        });
    };

    const handleEditCancel = () => {
        // Clear the edit state when the user cancels editing
        setEdit({
            _id: '',
            description: '',
            status: false,
        });
    };

    return (
        <div className="todo-list">
            {todos?.map((todo) => (
                <div className={`todo-row ${todo.status ? 'complete' : ''}`} key={todo._id}>
                    {edit._id === todo._id ? (
                        // Render the TodoForm for editing
                        <TodoForm
                            edit={todo}
                            onSubmit={handleEditSubmit}
                            onCancel={handleEditCancel}
                            onEdit={editTodo}
                            buttonDescription="Save"
                        />
                    ) : (
                        // Render the todo item with icons for complete, edit, and delete
                        <>
                            <div onClick={() => completeTodo && completeTodo(todo._id)}>
                                {todo.description}
                            </div>
                            <div className="icons">
                                <AiOutlineCheckCircle
                                    onClick={() => completeTodo && completeTodo(todo._id)}
                                    className=""
                                />
                                <TiEdit
                                    onClick={() =>
                                        setEdit({
                                            _id: todo._id,
                                            description: todo.description,
                                            status: todo.status,
                                        })
                                    }
                                    className="edit-icon"
                                />
                                <RiCloseCircleLine
                                    onClick={() => removeTodo && removeTodo(todo._id)}
                                    className="delete-icon"
                                />
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TodoList;
