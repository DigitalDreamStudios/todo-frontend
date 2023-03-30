import axios from "axios";
import { toast } from "react-toastify";
import { TodoType } from '../types/todo.type';

// GET METHOD
const getTodos = () => {
    // GET all Todos from API and save it on session storage
    axios.get('/api/getall')
        .then(res => {
            sessionStorage.setItem('todos', JSON.stringify(res.data));
        })
        .catch(err => {
            console.log(err);
        });
};

// POST METHOD
const addTodo = (todo: TodoType) => {
    if (!todo.description.trim()) {
        return toast.error(
            'Please enter a valid Todo!', {
            autoClose: 500,
        });;
    }

    // POST a new Todo to API and save it on session storage
    axios.post('/api/create', todo)
        .then(res => {
            // Update session storage data, add the new item
            getTodos();

            return toast.success(
                'To do added successfully!', {
                autoClose: 500,
            });
        })
        .catch(err => {
            console.log(err);
        });
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

const completeTodo = (_id: string) => {
    // PATCH a Todo from API and save it on session storage
    axios.patch(`/api/complete/?id=${_id}`)
        .then(res => {
            return toast.success(
                'To do completed successfully!', {
                autoClose: 500,
            });
        })
        .catch(err => {
            console.log(err);
        });
};

const editTodo = (todo: TodoType) => {
    axios.patch(`/api/update/?id=${todo._id}`, todo)
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


export { getTodos, addTodo, removeTodo, completeTodo, editTodo }