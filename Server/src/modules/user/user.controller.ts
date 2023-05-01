import { Body, Controller, Delete, Get, HttpStatus, Patch, Post, Query, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { notFound } from 'src/common/errors/notFound.error';
import { Response } from 'express';

@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    // Endpoint for getting all users
    @Get()
    async getAll(@Res() res: Response) {
        const users = await this.userService.getUsers();

        // If there are no users, return a 404 error with a message
        if (users.length === 0) return notFound('USER');

        // Return all users
        return res.status(HttpStatus.OK).json(users);
    }

    // Endpoint for getting a single user by id
    @Get('filter')
    async getOne(@Res() res: Response, @Query('id') id: string) {
        const user = await this.userService.getUserById(id);

        // If user is not found, return a 404 error with a message
        if (!user) return notFound('USER');

        // Return the user
        return res.status(HttpStatus.OK).json(user);
    }

    // Endpoint for creating a new user
    @Post()
    async create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
        const user = await this.userService.createUser(createUserDto);

        return res.status(HttpStatus.OK).json({
            message: 'User created successfully',
            user: user
        });
    }

    // Endpoint for updating a user by id
    @Patch()
    async update(@Res() res: Response, @Query('id') id: string, @Body() createUserDto: CreateUserDto) {
        const user = await this.userService.updateUserById(id, createUserDto);

        // If user is not found, return a 404 error with a message
        if (!user) return notFound('USER');

        // Return the updated user
        return res.status(HttpStatus.OK).json({
            message: 'User updated successfully',
            user: user
        });
    }

    // Endpoint for deleting a user by id
    @Delete()
    async delete(@Res() res: Response, @Query('id') id: string) {
        const user = await this.userService.deleteUserById(id);

        // If user is not found, return a 404 error with a message
        if (!user) return notFound('USER');

        // Return a success message
        return res.status(HttpStatus.OK).json({
            message: 'User deleted successfully'
        });
    }
}
