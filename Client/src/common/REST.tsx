import axios from "axios";
import { toast } from "react-toastify";
import { TodoType } from '../types/todo.type';
import { Todo } from "../interfaces/todo.interface";

// GET METHOD
const getTodo = () => {
    return axios.get('/api/getAll')
        .then(res => {
            const todos = res.data.map((todo: Todo) => {
                return {
                    _id: todo._id,
                    description: todo.description,
                    status: todo.status,
                };
            });
            return todos;
        })
        .catch(err => {
            if (err.response && err.response.status === 404) {
                return [];
            } else {
                console.log(err);
                return [];
            }
        });
};

// POST METHOD
const addTodo = async (todo: TodoType): Promise<Todo | undefined> => {
    if (!todo.description.trim()) {
        toast.error('Please enter a valid Todo!', {
            autoClose: 500,
        });
        return undefined;
    }
    try {
        const res = await axios.post('/api/create', todo);
        const newTodo = {
            _id: res.data.todo._id,
            description: res.data.todo.description,
            status: res.data.todo.status,
        };
        toast.success('To do added successfully!', {
            autoClose: 500,
        });
        return { ...newTodo, _id: newTodo._id };
    } catch (error) {
        console.error(error);
        return undefined;
    }
};

// DELETE METHOD
const removeTodo = async (_id: string): Promise<boolean> => {
    try {
        await axios.delete(`/api/delete/?id=${_id}`);
        toast.success('To do removed successfully!', { autoClose: 500 });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// PATCH METHOD
const completeTodo = async (_id: string): Promise<Todo | undefined> => {
    try {
        const response = await axios.get(`/api/getOne/?id=${_id}`);
        const currentStatus = response.data.status;
        const newStatus = !currentStatus; // toggle the current status

        // PATCH the new status to the API
        const res = await axios.patch(`/api/update/?id=${_id}`, { status: newStatus });
        const updatedTodo = {
            _id: res.data.todo._id,
            description: res.data.todo.description,
            status: res.data.todo.status,
        }
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
const editTodo = async (todo: TodoType): Promise<Todo | undefined> => {
    try {
        const res = await axios.patch(`/api/update/?id=${todo._id}`, {
            description: todo.description,
        });
        const updatedTodo = {
            _id: res.data.todo._id,
            description: res.data.todo.description,
            status: res.data.todo.status,
        }
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


export { getTodo, addTodo, removeTodo, completeTodo, editTodo }