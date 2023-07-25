import { useState, useEffect } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import './TodoList.css';
import { TodoService } from '../../services/todo.service';
import { toast } from 'react-toastify';
import { Todo } from '../../models/todo.type';

const todoService = new TodoService();

const TodoList = (props: { token: string | null, userId: number | null }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch todos on component mount if props.token is not null
    if (props.token !== null) {
      fetchTodos();
    }
  }, [props.token]);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTodos = await todoService.getTodo(props.token);
      // TODO: Update the todos state with the fetched todos

      setTodos(fetchedTodos);
    } catch (error) {
      setError('Failed to fetch todos.');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteTodo = async (todoId: string) => {
    try {
      setLoading(true);
      setError(null);
      toast.info(`Completing todo ${todoId}...`);
    } catch (error) {
      setError('Failed to complete the todo.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditTodo = async (editedTodo: Todo) => {
    try {
      setLoading(true);
      setError(null);
      toast.info(`Updating todo ${editedTodo.id}...`);
    } catch (error) {
      setError('Failed to update the todo.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveTodo = async (todoId: string) => {
    try {
      setLoading(true);
      setError(null);
      toast.info(`Removing todo ${todoId}...`);
    } catch (error) {
      setError('Failed to remove the todo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="todo-list">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        todos.map((todo) => (
          <div className={`todo-row ${todo.completed ? 'complete' : ''}`} key={todo.id}>
            <div onClick={() => handleCompleteTodo && handleCompleteTodo(todo.id)}>
              {todo.title}
            </div>
            <div className="icons">
              <AiOutlineCheckCircle
                onClick={() => handleCompleteTodo && handleCompleteTodo(todo.id)}
                className="complete-icon"
              />
              <TiEdit onClick={() => handleEditTodo && handleEditTodo(todo)} className="edit-icon" />
              <RiCloseCircleLine
                onClick={() => handleRemoveTodo && handleRemoveTodo(todo.id)}
                className="delete-icon"
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TodoList;
