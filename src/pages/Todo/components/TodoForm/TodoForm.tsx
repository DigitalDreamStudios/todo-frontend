import { useState, useRef, FormEvent } from 'react';
import { TodoService } from '../../services/todo.service';
import './TodoForm.css';
import { TodoRequest } from '../../models/TodoRequest.type';
import { toast } from 'react-toastify';

const TodoForm = (props: { token: string | null; userId: number | null }) => {
  const todoService = new TodoService();
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      // Validate title input
      toast.error('Please enter a todo title.');
      return;
    }

    const newTodoRequest: TodoRequest = {
      title,
      description: '',
      completed: false,
      userId: props.userId,
    };

    const newTodo = await todoService.addTodo(props.token, newTodoRequest);

    if (newTodo) {
      // Handle successful addition
      setTitle('');
    } else {
      // Handle addition error
      toast.error('An error occurred while adding the todo.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder="Add a todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        ref={inputRef}
        className="todo-input"
      />
      <button type="submit" className="todo-button">
        Add todo
      </button>
    </form>
  );
};

export default TodoForm;
