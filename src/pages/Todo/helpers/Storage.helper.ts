import { Todo } from "../models/Todo.type";

// Helper function to update the todos in sessionStorage
function updateSessionStorageTodos(todos: Todo[]): void {
    sessionStorage.setItem('todos', JSON.stringify(todos));
}

// Helper function to get the todos from sessionStorage
function getSessionStorageTodos(): Todo[] {
    const todosFromSession = sessionStorage.getItem('todos');
    return todosFromSession ? JSON.parse(todosFromSession) : [];
}

// Export the helper functions
export { updateSessionStorageTodos, getSessionStorageTodos };