import { Todo } from '../interfaces/todo.interface';

type TodoType = {
    _id?: string;
    description: string;
    status: boolean;
};

type TodoProps = {
    todos: Todo[];
    completeTodo?: (_id: string) => void;
    removeTodo?: (_id: string) => void;
    editTodo: (todo: TodoType) => void;
};

export type { TodoType, TodoProps }