import { Body, Controller, HttpStatus, Post, Res, Get, Patch, Query, Delete } from '@nestjs/common';
import { CreateTodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';
import { notFound } from '../../common/utils/notFound';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    // Endpoint to create a new todo item
    @Post()
    async create(@Res() res: any, @Body() createTodoDto: CreateTodoDto) {
        const todo = await this.todoService.createTodo(createTodoDto);

        // Return response with status code 200 and the created todo item
        return res.status(HttpStatus.OK).json({
            message: 'To do created successfully',
            todo: todo
        });
    }

    // Endpoint to get all todo items
    @Get()
    async getAll(@Res() res: any) {
        const todos = await this.todoService.getTodos();

        // If no todo items are found, return a "not found" response
        if (todos.length === 0) return notFound(res, 'To do');

        // Return response with status code 200 and the array of todo items
        return res.status(HttpStatus.OK).json(todos);
    }

    // Endpoint to get a single todo item by ID
    @Get()
    async getOne(@Res() res: any, @Query('id') id: string) {
        const todo = await this.todoService.getTodoById(id);

        // If no todo item is found with the given ID, return a "not found" response
        if (!todo) return notFound(res, 'To do');

        // Return response with status code 200 and the requested todo item
        return res.status(HttpStatus.OK).json(todo);
    }

    // Endpoint to update a single todo item by ID
    @Patch()
    async update(@Res() res: any, @Query('id') id: string, @Body() createTodoDto: CreateTodoDto) {
        const todo = await this.todoService.updateTodoById(id, createTodoDto);

        // If no todo item is found with the given ID, return a "not found" response
        if (!todo) return notFound(res, 'To do');

        // Return response with status code 200 and the updated todo item
        return res.status(HttpStatus.OK).json({
            message: 'To do updated successfully',
            todo: todo
        });
    }

    // Endpoint to delete a single todo item by ID
    @Delete()
    async delete(@Res() res: any, @Query('id') id: string) {
        const todo = await this.todoService.deleteTodoById(id);

        // If no todo item is found with the given ID, return a "not found" response
        if (!todo) return notFound(res, 'To do');

        // Return response with status code 200 and a success message
        return res.status(HttpStatus.OK).json({
            message: 'To do deleted successfully'
        });
    }
}