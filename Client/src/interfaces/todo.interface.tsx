import { TodoType } from '../types/todo.type';

interface Todo {
    _id: string;
    description: string;
    status: boolean;
}

interface TodoFormProps {
    edit?: TodoType;
    onSubmit: (todo: TodoType) => void;
    onCancel?: () => void;
    onEdit?: (todo: TodoType) => void;
    buttonDescription?: string;
}

export type { Todo, TodoFormProps };