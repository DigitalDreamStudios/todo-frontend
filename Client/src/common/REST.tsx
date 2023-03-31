import axios from "axios";
import { toast } from "react-toastify";
import { TodoType } from '../types/todo.type';
import { Todo } from "../interfaces/todo.interface";

// GET METHOD
const getTodo = () => {
    return axios.get('/api/getAll')
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.log(err);
            return [];
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
const removeTodo = (_id: string) => {
    // DELETE a Todo from API and save it on session storage
    axios.delete(`/api/delete/?id=${_id}`)
        .then(res => {
            return toast.success(
                'To do removed successfully!', {
                autoClose: 500,
            });
        })
        .catch(err => {
            console.log(err);
        });
};

// PATCH METHOD
const completeTodo = (_id: string) => {
    // PATCH a Todo from API and save it on session storage
    axios.get(`/api/getOne/?id=${_id}`)
        .then(response => {
            const currentStatus = response.data.status;
            const newStatus = !currentStatus; // toggle the current status
            axios.patch(`/api/update/?id=${_id}`, { status: newStatus })
                .then(res => {
                    return toast.success(
                        'To do completed successfully!', {
                        autoClose: 500,
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(error => {
            console.log(error);
        });
};

// PATCH METHOD
const editTodo = async (todo: TodoType) => {
    console.log(todo);

    await axios.patch(`/api/update/?id=${todo._id}`, {
        description: todo.description,
    })
        .then(res => {
            return toast.success(
                'To do updated successfully!', {
                autoClose: 500,
            });
        })
        .catch(err => {
            console.log(err);
        });
};

export { getTodo, addTodo, removeTodo, completeTodo, editTodo }