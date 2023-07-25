import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Todo } from '../models/todo.type';
import { TodoRequest } from "../models/TodoRequest.type";
import { ApiResponse } from "../../../models/ApiResponse.type";
import { updateSessionStorageTodos } from "../helpers/storage.helper";

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
                toast.error('Something went wrong while fetching the todos!');
                return [];
            }
        }
    };

    // POST METHOD
    async addTodo(token: string | null, todo: TodoRequest): Promise<Todo | undefined> {
        if (!todo.title.trim()) {
            toast.error('Please enter a valid Todo!', {
                autoClose: 500,
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
                autoClose: 500,
            });
            return newTodo;
        } catch (error) {
            toast.error('Something went wrong while adding the todo!');
            return undefined;
        }
    };

    // DELETE METHOD
    async removeTodo(token: string | null, _id: string): Promise<boolean> {
        try {
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            await axios.delete(`${this.BASE_URL}/${_id}`, { headers });
            toast.success('To do removed successfully!', { autoClose: 500 });

            // Update sessionStorage after removing todo
            const todosFromSession = sessionStorage.getItem('todos');
            if (todosFromSession) {
                let todos: Todo[] = JSON.parse(todosFromSession);
                todos = todos.filter(todo => todo.id !== _id);
                updateSessionStorageTodos(todos);
            }

            return true;
        } catch (error) {
            return false;
        }
    };

    // PATCH METHOD
    async completeTodo(token: string | null, _id: string): Promise<Todo | undefined> {
        try {
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const response: AxiosResponse<Todo> = await axios.get(`${this.BASE_URL}/${_id}`, { headers });
            const currentStatus = response.data?.completed;
            if (currentStatus === undefined) {
                return undefined;
            }
            const newStatus = !currentStatus; // toggle the current status

            // PATCH the new status to the API
            const res: AxiosResponse<ApiResponse> = await axios.patch(`${this.BASE_URL}/${_id}`, { status: newStatus }, { headers });
            const updatedTodo: Todo = {
                id: res.data.data.id,
                title: res.data.data.title,
                description: res.data.data.description,
                completed: res.data.data.completed,
            };

            // Update sessionStorage after completing todo
            const todosFromSession = sessionStorage.getItem('todos');
            if (todosFromSession) {
                const todos: Todo[] = JSON.parse(todosFromSession);
                const todoIndex = todos.findIndex(todo => todo.id === _id);
                if (todoIndex !== -1) {
                    todos[todoIndex].completed = newStatus;
                    updateSessionStorageTodos(todos);
                }
            }

            toast.success(
                'To do completed successfully!', {
                autoClose: 500
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
            const res: AxiosResponse<Todo> = await axios.patch(`${this.BASE_URL}/${todo.id}`, { description: todo.description }, { headers });
            const updatedTodo: Todo = {
                id: res.data.id,
                title: res.data.title,
                description: res.data.description,
                completed: res.data.completed,
            };

            // Update sessionStorage after editing todo
            const todosFromSession = sessionStorage.getItem('todos');
            if (todosFromSession) {
                const todos: Todo[] = JSON.parse(todosFromSession);
                const todoIndex = todos.findIndex(t => t.id === todo.id);
                if (todoIndex !== -1) {
                    todos[todoIndex].description = todo.description;
                    updateSessionStorageTodos(todos);
                }
            }

            toast.success(
                'To do updated successfully!', {
                autoClose: 500
            });
            return updatedTodo;
        } catch (err) {
            return undefined;
        }
    };
}