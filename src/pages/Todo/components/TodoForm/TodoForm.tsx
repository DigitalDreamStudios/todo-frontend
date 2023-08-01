import { useState, FormEvent } from 'react';
import { TodoService } from '../../services/Todo.service';
import './TodoForm.css';
import { TodoRequest } from '../../models/TodoRequest.type';
import { toast } from 'react-toastify';
import { useSession } from '../../context/SessionContext';

const TodoForm = (props: { token: string | null; userId: number | null }) => {
  // Form states
  const [title, setTitle] = useState('');
  // Context hooks
  const session = useSession();
  // Service
  const todoService = new TodoService();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      // Validate title input
      toast.error('Please enter a todo title.', {
        // Make it dissapear faster
        autoClose: 1000,
        // Prevent duplicate toasts
        toastId: 'empty-title',
      });
      return;
    }

    const newTodoRequest: TodoRequest = {
      title,
      description: '',
      userId: props.userId,
    };

    const newTodo = await todoService.addTodo(props.token, newTodoRequest);

    if (newTodo) {
      // Handle successful addition
      setTitle('');
      session.updateTodos()
    } else {
      // Handle addition error
      toast.error('An error occurred while adding the todo.', {
        // Make it dissapear faster
        autoClose: 1000,
        // Prevent duplicate toasts
        toastId: 'add-todo-error',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder="Add a todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="todo-input"
      />
      <button type="submit" className="todo-button">
        Add todo
      </button>
    </form>
  );
};

export default TodoForm;
