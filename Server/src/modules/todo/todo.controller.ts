import { Body, Controller, HttpStatus, Post, Res, Get, Patch, Query, Delete } from '@nestjs/common';
import { CreateTodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';
import { notFound } from '../../common/errors/notFound.error';
import { Response } from 'express';

/**
 * A controller responsible for handling todo-related requests
 */
@Controller('api/todo')
export class TodoController {

    /**
     * Creates an instance of TodoController.
     * @param {TodoService} todoService - An instance of the TodoService
     */
    constructor(private readonly todoService: TodoService) { }

    /**
     * Endpoint to get all todo items
     * @param {Response} res - An instance of the Express Response object
     * @returns {Promise<Response>} - A Promise that resolves to a response with status code 200 and an array of todo items
     */
    @Get()
    async getAll(@Res() res: Response): Promise<Response> {
        const todos = await this.todoService.getTodos();

        // If no todo items are found, return a "not found" response
        if (todos.length === 0) return notFound('TODO');

        // Return response with status code 200 and the array of todo items
        return res.status(HttpStatus.OK).json(todos);
    }

    /**
     * Endpoint to get a single todo item by ID
     * @param {Response} res - An instance of the Express Response object
     * @param {string} id - The ID of the todo item to retrieve
     * @returns {Promise<Response>} - A Promise that resolves to a response with status code 200 and the requested todo item
     */
    @Get('filter')
    async getOne(@Res() res: Response, @Query('id') id: string): Promise<Response> {
        const todo = await this.todoService.getTodoById(id);

        // If no todo item is found with the given ID, return a "not found" response
        if (!todo) return notFound('TODO');

        // Return response with status code 200 and the requested todo item
        return res.status(HttpStatus.OK).json(todo);
    }

    /**
     * Endpoint to create a new todo item
     * @param {Response} res - An instance of the Express Response object
     * @param {CreateTodoDto} createTodoDto - An instance of the CreateTodoDto class, containing the details of the new todo item
     * @returns {Promise<Response>} - A Promise that resolves to a response with status code 200 and the created todo item
     */
    @Post()
    async create(@Res() res: Response, @Body() createTodoDto: CreateTodoDto): Promise<Response> {
        const todo = await this.todoService.createTodo(createTodoDto);

        // Return response with status code 200 and the created todo item
        return res.status(HttpStatus.OK).json({
            message: 'To do created successfully',
            todo: todo
        });
    }

    /**
     * Endpoint to update a single todo item by ID
     * @param {Response} res - An instance of the Express Response object
     * @param {string} id - The ID of the todo item to update
     * @param {CreateTodoDto} createTodoDto - An instance of the CreateTodoDto class, containing the updated details of the todo item
     * @returns {Promise<Response>} - A Promise that resolves to a response with status code 200 and the updated todo item
     */
    @Patch()
    async update(@Res() res: Response, @Query('id') id: string, @Body() createTodoDto: CreateTodoDto): Promise<Response> {
        const todo = await this.todoService.updateTodoById(id, createTodoDto);

        // If no todo item is found with the given ID, return a "not found" response
        if (!todo) return notFound('TODO');

        // Return response with status code 200 and the updated todo item
        return res.status(HttpStatus.OK).json({
            message: 'To do updated successfully',
            todo: todo
        });
    }

    /**
     * Endpoint to delete a single todo item by ID
     * @param {Response} res - An instance of the Express Response object
     * @param {string} id - The ID of the todo item to delete
     * @returns {Promise<Response>} - A Promise that resolves to a response with status code 200 and a success message
     */
    @Delete()
    async delete(@Res() res: Response, @Query('id') id: string): Promise<Response> {
        const todo = await this.todoService.deleteTodoById(id);

        // If no todo item is found with the given ID, return a "not found" response
        if (!todo) return notFound('TODO');

        // Return response with status code 200 and a success message
        return res.status(HttpStatus.OK).json({
            message: 'To do deleted successfully'
        });
    }
}