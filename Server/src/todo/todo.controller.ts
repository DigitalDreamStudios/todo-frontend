import { Body, Controller, HttpStatus, Post, Res, Get, Patch, Query, Delete } from '@nestjs/common';
import { CreateTodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';

@Controller('api')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @Post('/create')
    async create(@Res() res: any, @Body() createTodoDto: CreateTodoDto) {
        const todo = await this.todoService.createTodo(createTodoDto);

        return res.status(HttpStatus.OK).json({
            message: 'Todo created successfully',
            todo: todo
        });
    }

    @Get('/getAll')
    async getAll(@Res() res: any) {
        const todos = await this.todoService.getTodos();

        if(todos.length === 0) return notFound(res);

        return res.status(HttpStatus.OK).json(todos);
    }

    @Get('/getOne')
    async getOne(@Res() res: any, @Query('id') id: string) {
        const todo = await this.todoService.getTodoById(id);

        if (!todo) return notFound(res);

        return res.status(HttpStatus.OK).json(todo);
    }

    @Patch('/update')
    async update(@Res() res: any, @Query('id') id: string, @Body() createTodoDto: CreateTodoDto) {
        const todo = await this.todoService.updateTodoById(id, createTodoDto);

        if (!todo) return notFound(res);

        return res.status(HttpStatus.OK).json({
            message: 'Todo updated successfully',
            todo: todo
        });
    }

    @Delete('/delete')
    async delete(@Res() res: any, @Query('id') id: string) {
        const todo = await this.todoService.deleteTodoById(id);

        if (!todo) return notFound(res);

        return res.status(HttpStatus.OK).json({
            message: 'Todo deleted successfully'
        });
    }
}

// Helper functions
const notFound = (res: any) => {
    return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Todo not found'
    });
};