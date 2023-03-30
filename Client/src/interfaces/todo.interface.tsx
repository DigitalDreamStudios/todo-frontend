import { TodoType } from '../types/todo.type';

interface Todo {
    _id?: string;
    description: string;
    status: boolean;
}

interface TodoFormProps {
    edit?: TodoType;
    onSubmit: (todo: TodoType) => void;
    onCancel?: () => void;
    buttonDescription?: string;
}

type TodoProps = {
    todos: Todo[];
    completeTodo?: (_id: string) => void;
    removeTodo?: (_id: string) => void;
    editTodo?: TodoType;
};

export type { Todo, TodoFormProps, TodoProps };