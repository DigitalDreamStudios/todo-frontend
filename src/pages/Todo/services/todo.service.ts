import axios from "axios";
import { toast } from "react-toastify";
import { TodoType } from '../types/todo.type';
import { Todo } from "../interfaces/todo.interface";

export class TodoService {
    // GET METHOD
    async getTodo(): Promise<Todo[]> {
        try {
            const res = await axios.get('/todo');
            const todos = res.data.map((todo: Todo) => ({
                _id: todo._id,
                description: todo.description,
                status: todo.status,
            }));
            return todos;
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                return [];
            } else {
                console.log(error);
                return [];
            }
        }
    };

    // POST METHOD
    async addTodo(todo: TodoType): Promise<Todo | undefined> {
        if (!todo.description.trim()) {
            toast.error('Please enter a valid Todo!', {
                autoClose: 500,
            });
            return undefined;
        }
        try {
            const res = await axios.post('/todo', todo);
            const newTodo: Todo = {
                _id: res.data.todo._id,
                description: res.data.todo.description,
                status: res.data.todo.status,
            };
            toast.success('To do added successfully!', {
                autoClose: 500,
            });
            return newTodo;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    };

    // DELETE METHOD
    async removeTodo(_id: string): Promise<boolean> {
        try {
            await axios.delete(`/todo/?id=${_id}`);
            toast.success('To do removed successfully!', { autoClose: 500 });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    // PATCH METHOD
    async completeTodo(_id: string): Promise<Todo | undefined> {
        try {
            const response = await axios.get(`/todo/?id=${_id}`);
            const currentStatus = response.data?.status;
            if (currentStatus === undefined) {
                return undefined;
            }
            const newStatus = !currentStatus; // toggle the current status

            // PATCH the new status to the API
            const res = await axios.patch(`/todo/?id=${_id}`, { status: newStatus });
            const updatedTodo: Todo = {
                _id: res.data.todo._id,
                description: res.data.todo.description,
                status: res.data.todo.status,
            };
            toast.success(
                'To do completed successfully!', {
                autoClose: 500
            });
            return updatedTodo;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    };

    // PATCH METHOD
    async editTodo(todo: TodoType): Promise<Todo | undefined> {
        try {
            const res = await axios.patch(`/todo/?id=${todo._id}`, {
                description: todo.description,
            });
            const updatedTodo: Todo = {
                _id: res.data.todo._id,
                description: res.data.todo.description,
                status: res.data.todo.status,
            };
            toast.success(
                'To do updated successfully!', {
                autoClose: 500
            });
            return updatedTodo;
        } catch (err) {
            console.log(err);
            return undefined;
        }
    };
}
