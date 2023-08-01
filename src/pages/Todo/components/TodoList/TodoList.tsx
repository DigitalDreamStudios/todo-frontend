import { useState, useEffect } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import './TodoList.css';
import { TodoService } from '../../services/Todo.service';
import { toast } from 'react-toastify';
import { Todo } from '../../models/Todo.type';
import { getSessionStorageTodos } from '../../helpers/Storage.helper';
import { useSession } from '../../context/SessionContext';

const TodoList = (props: { token: string | null, userId: number | null }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const todoService = new TodoService();
  const session = useSession();

  useEffect(() => {
    if (props.token !== null) {
      fetchTodos();
    }
  }, []);

  useEffect(() => {
    // Update todos from sessionStorage
    setTodos(getSessionStorageTodos());
  }, [session.todos]);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTodos = await todoService.getTodo(props.token);
      setTodos(fetchedTodos); // Update the todos state with the fetched todos
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
      if (await todoService.completeTodo(props.token, todoId)) session.updateTodos();
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
      if (await todoService.editTodo(props.token, editedTodo)) session.updateTodos();
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
      if (await todoService.removeTodo(props.token, todoId)) session.updateTodos();
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
