import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Todo } from '../models/Todo.type';
import { TodoRequest } from "../models/TodoRequest.type";
import { ApiResponse } from "../../../models/ApiResponse.type";
import { updateSessionStorageTodos } from "../helpers/Storage.helper";

export class TodoService {
    private readonly BASE_URL = '/todo';

    // GET METHOD    
    async getTodo(token: string | null): Promise<Todo[]> {
        try {
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const res: AxiosResponse<ApiResponse> = await axios.get(this.BASE_URL, { headers });

            const todos = res.data.data.map((todo: Todo) => ({
                id: todo.id,
                title: todo.title,
                description: todo.description,
                completed: todo.completed,
            }));

            // Save todos to sessionStorage
            updateSessionStorageTodos(todos);
            return todos;
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                return [];
            } else {
                toast.error('Something went wrong while fetching the todos!', {
                    // Make it dissapear faster
                    autoClose: 1000,
                    // Prevent duplicate toasts
                    toastId: 'fetch-todos-error',
                });
                return [];
            }
        }
    };

    // POST METHOD
    async addTodo(token: string | null, todo: TodoRequest): Promise<Todo | undefined> {
        if (!todo.title.trim()) {
            toast.error('Please enter a valid Todo!', {
                // Make it dissapear faster
                autoClose: 1000,
                // Prevent duplicate toasts
                toastId: 'add-todo-error',
            });
            return undefined;
        }
        try {
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const res: AxiosResponse<ApiResponse> = await axios.post(this.BASE_URL, todo, { headers });
            const newTodo: Todo = {
                id: res.data.data.id,
                title: res.data.data.title,
                description: res.data.data.description,
                completed: res.data.data.completed,
            };

            // Update sessionStorage after adding new todo
            const todosFromSession = sessionStorage.getItem('todos');
            let todos: Todo[] = todosFromSession ? JSON.parse(todosFromSession) : [];
            todos.push(newTodo);
            updateSessionStorageTodos(todos);

            toast.success('To do added successfully!', {
                // Make it dissapear faster
                autoClose: 1000,
                // Prevent duplicate toasts
                toastId: 'add-todo-success',
            });
            return newTodo;
        } catch (error) {
            toast.error('Something went wrong while adding the todo!', {
                // Make it dissapear faster
                autoClose: 1000,
                // Prevent duplicate toasts
                toastId: 'add-todo-error',
            });
            return undefined;
        }
    };

    // DELETE METHOD
    async removeTodo(token: string | null, id: string): Promise<boolean> {
        try {
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            await axios.delete(`${this.BASE_URL}/${id}`, { headers });
            toast.success('To do removed successfully!', {
                // Make it dissapear faster
                autoClose: 1000,
                // Prevent duplicate toasts
                toastId: 'remove-todo-success',
            });

            // Update sessionStorage after removing todo
            const todosFromSession = sessionStorage.getItem('todos');
            if (todosFromSession) {
                let todos: Todo[] = JSON.parse(todosFromSession);
                todos = todos.filter(todo => todo.id !== id);
                updateSessionStorageTodos(todos);
            }

            return true;
        } catch (error) {
            toast.error('Something went wrong while removing the todo!', {
                // Make it dissapear faster
                autoClose: 1000,
                // Prevent duplicate toasts
                toastId: 'remove-todo-error',
            });
            return false;
        }
    };

    // PATCH METHOD
    async completeTodo(token: string | null, id: string): Promise<Todo | undefined> {
        try {
            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            // Fetch the current todo
            const response: AxiosResponse<ApiResponse> = await axios.get(`${this.BASE_URL}/filter?id=${id}`, { headers });
            const currentTodo = response.data.data;

            // Toggle the completed status
            const newStatus = !currentTodo.completed;

            // PATCH the new status to the API
            const res: AxiosResponse<ApiResponse> = await axios.patch(
                `${this.BASE_URL}/${id}`,
                { completed: newStatus }, // Update only the 'completed' property
                { headers }
            );

            // Return the updated todo
            const updatedTodo: Todo = res.data.data;

            // Update sessionStorage after completing todo
            const todosFromSession = sessionStorage.getItem('todos');
            if (todosFromSession) {
                const todos: Todo[] = JSON.parse(todosFromSession);
                const todoIndex = todos.findIndex(todo => todo.id === id);
                if (todoIndex !== -1) {
                    todos[todoIndex].completed = newStatus;
                    updateSessionStorageTodos(todos);
                }
            }

            toast.success(
                'To do completed successfully!', {
                // Make it dissapear faster
                autoClose: 1000,
                // Prevent duplicate toasts
                toastId: 'complete-todo-success',
            });

            return updatedTodo;
        } catch (error) {
            return undefined;
        }
    };

    // PATCH METHOD
    async editTodo(token: string | null, todo: Todo): Promise<Todo | undefined> {
        try {
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const res: AxiosResponse<ApiResponse> = await axios.patch(`${this.BASE_URL}/${todo.id}`, todo, { headers });
            const updatedTodo: Todo = res.data.data;

            // Update sessionStorage after editing todo
            const todosFromSession = sessionStorage.getItem('todos');
            if (todosFromSession) {
                const todos: Todo[] = JSON.parse(todosFromSession);
                const todoIndex = todos.findIndex(t => t.id === todo.id);
                if (todoIndex !== -1) {
                    todos[todoIndex] = todo;
                    updateSessionStorageTodos(todos);
                }
            }

            toast.success(
                'To do updated successfully!', {
                // Make it dissapear faster
                autoClose: 1000,
                // Prevent duplicate toasts
                toastId: 'edit-todo-success',
            });
            return updatedTodo;
        } catch (err) {
            return undefined;
        }
    };
}
