import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './interface/todo.interface';
import { CreateTodoDto } from './dto/todo.dto';

@Injectable()
export class TodoService {

    constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) { }

    /**
     * Retrieves all Todos from the database
     * @returns A Promise that resolves to an array of all Todos
     */
    async getTodos(): Promise<Todo[]> {
        const todos = await this.todoModel.find();
        return todos;
    }

    /**
     * Retrieves a Todo by its ID
     * @param id The ID of the Todo to retrieve
     * @returns A Promise that resolves to the Todo object or null if it doesn't exist
     */
    async getTodoById(id: string): Promise<Todo> {
        const findTodo = await this.todoModel.findById(id);
        return findTodo;
    }

    /**
     * Creates a new Todo
     * @param createTodoDto The DTO containing the Todo information
     * @returns A Promise that resolves to the created Todo
     */
    async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
        const newTodo = new this.todoModel(createTodoDto);
        return newTodo.save();
    }

    /**
     * Updates an existing Todo by its ID
     * @param id The ID of the Todo to update
     * @param createTodoDto The DTO containing the updated Todo information
     * @returns A Promise that resolves to the updated Todo or null if it doesn't exist
     */
    async updateTodoById(id: string, createTodoDto: CreateTodoDto): Promise<Todo> {
        const updatedTodo = await this.todoModel.findByIdAndUpdate(id, createTodoDto, { new: true });
        return updatedTodo;
    }

    /**
     * Deletes a Todo by its ID
     * @param id The ID of the Todo to delete
     * @returns A Promise that resolves to the deleted Todo or null if it doesn't exist
     */
    async deleteTodoById(id: string): Promise<Todo> {
        const deleteTodo = await this.todoModel.findByIdAndRemove(id);
        return deleteTodo;
    }
}
