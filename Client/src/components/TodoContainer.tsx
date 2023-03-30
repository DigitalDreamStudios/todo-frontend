import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import uuid from 'react-uuid';

// Import components
import TodoForm from './TodoForm';
import TodoList from './TodoList';

// Import styles
import '../assets/css/card.css';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

// Import interfaces
import { Todo } from '../interfaces/todo.interface';

// Import functions
import { getTodos, removeTodo, completeTodo } from '../common/function';

const TodoContainer: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    axios.get('/api/getall')
      .then(res => {
        sessionStorage.setItem('todos', JSON.stringify(res.data));
        setTodos(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className='card-container'>
      <div className='card'>
        <h1>What's the Plan for Today?</h1>
        <TodoForm
          onSubmit={()=>{
            console.log('onSubmit');
          }}
          edit={undefined}
          onCancel={() => { }}
          buttonDescription=''
        />

        <TodoList
          todos={todos}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          editTodo={ undefined }
        />

        <ToastContainer />
      </div>
    </div>
  );
};

export default TodoContainer;