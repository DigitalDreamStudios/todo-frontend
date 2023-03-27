import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Todo } from './interface/todo.interface';
import { CreateTodoDto } from './dto/todo.dto';

@Injectable()
export class TodoService {
    constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

    async getTodos(): Promise<Todo[]> {
        const todos = await this.todoModel.find();
        return todos;
    }

    async getTodoById(id: string): Promise<Todo> {
        const findTodo = await this.todoModel.findById(id);
        return findTodo;
    }

    async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
        const newTodo = new this.todoModel(createTodoDto);
        return newTodo.save();
    }

    async updateTodoById(id: string, createTodoDto: CreateTodoDto): Promise<Todo> {
        const updatedTodo = await this.todoModel.findByIdAndUpdate(id, createTodoDto, { new: true });
        return updatedTodo;
    }

    async deleteTodoById(id: string): Promise<Todo> {
        const deleteTodo = await this.todoModel.findByIdAndRemove(id);
        return deleteTodo;
    }
}
