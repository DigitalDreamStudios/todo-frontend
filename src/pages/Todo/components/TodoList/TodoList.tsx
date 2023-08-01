import { useState, useEffect } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import './TodoList.css';
import { TodoService } from '../../services/Todo.service';
import { Todo } from '../../models/Todo.type';
import { getSessionStorageTodos } from '../../helpers/Storage.helper';
import { useSession } from '../../context/SessionContext';
import EditModal from '../EditModal/EditModal';

const TodoList = (props: { token: string | null }) => {
  // List states
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedTodo, setEditedTodo] = useState<Todo | null>(null);
  // Context
  const session = useSession();
  // Service
  const todoService = new TodoService();

  useEffect(() => {
    if (props.token) fetchTodos();
  }, [props.token]);

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
      setError(null);
      if (await todoService.completeTodo(props.token, todoId)) session.updateTodos();
    } catch (error) {
      setError('Failed to complete the todo.');
    }
  };

  const handleEditTodo = async (editedTodo: Todo) => {
    try {
      setError(null);
      setEditedTodo(editedTodo);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Failed to update the todo.', error);
    }
  };

  const handleModalSave = async (updatedTodo: Todo) => {
    try {
      setError(null);
      if (updatedTodo) {
        if (await todoService.editTodo(props.token, updatedTodo)) {
          session.updateTodos();
          setIsModalOpen(false);
        }
      }
    } catch (error) {
      setError('Failed to update the todo.');
    }
  };

  const handleRemoveTodo = async (todoId: string) => {
    try {
      setError(null);
      if (await todoService.removeTodo(props.token, todoId)) session.updateTodos();
    } catch (error) {
      setError('Failed to remove the todo.');
    }
  };

  return (
    <div className="todo-list">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : todos.length === 0 ? ( // Check if there are no todos to display
        <div>No todos to fetch.</div>
      ) : (
        todos.map((todo) => (
          <div className={`todo-row ${todo.completed ? 'complete' : ''}`} key={todo.id}>
            <div onClick={() => handleCompleteTodo && handleCompleteTodo(todo.id)}>
              {todo.title}
            </div>
            <div className="icons">
              <TiEdit onClick={() => handleEditTodo && handleEditTodo(todo)} className="edit-icon" />
              <AiOutlineCheckCircle
                onClick={() => handleCompleteTodo && handleCompleteTodo(todo.id)}
                className="complete-icon"
              />
              <RiCloseCircleLine
                onClick={() => handleRemoveTodo && handleRemoveTodo(todo.id)}
                className="delete-icon"
              />
            </div>
          </div>
        ))
      )}
      {isModalOpen && (
        <EditModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          editedTodo={editedTodo}
          onModalSave={handleModalSave}
        />
      )}
    </div>
  );

};

export default TodoList;
