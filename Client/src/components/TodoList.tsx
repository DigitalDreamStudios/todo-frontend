import React, { useEffect, useState } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { AiOutlineCheckCircle } from 'react-icons/ai';

// Import components
import TodoForm from './TodoForm';

// Import styles
import '../assets/css/list.css'

// Import types
import { TodoType, TodoProps } from '../types/todo.type';

const TodoList: React.FC<TodoProps> = ({ todos, completeTodo, removeTodo, editTodo }) => {
    const [edit, setEdit] = useState<TodoType>({
        _id: "",
        description: "",
        status: false
    });

    const handleEditSubmit = async (todo: TodoType) => {
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
        <div className='todo-list'>
            {todos?.map((todo) => (
                <div
                    className={`todo-row ${todo.status ? 'complete' : ''}`}
                    key={todo._id}>
                    {edit._id === todo._id ? (
                        <TodoForm
                            edit={todo}
                            onSubmit={handleEditSubmit}
                            onCancel={handleEditCancel}
                            onEdit={editTodo}
                            buttonDescription="Save"
                        />

                    ) : (
                        <>
                            <div onClick={() => completeTodo && completeTodo(todo._id)}>{todo.description}</div>
                            <div className="icons">
                                <AiOutlineCheckCircle onClick={() => completeTodo && completeTodo(todo._id)}
                                    className="">
                                </AiOutlineCheckCircle>
                                <TiEdit
                                    onClick={() =>
                                        setEdit({ _id: todo._id, description: todo.description, status: todo.status })
                                    }
                                    className="edit-icon" />
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
