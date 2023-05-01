import { Body, Controller, Delete, Get, HttpStatus, Patch, Post, Query, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { notFound } from 'src/common/errors/notFound.error';
import { Response } from 'express';

@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    /**
     * Endpoint to get all users
     * @param {Response} res - An instance of the Express Response object
     * @returns {Promise<Response>} - A Promise that resolves to a response with status code 200 and an array of user objects
     */
    @Get()
    async getAll(@Res() res: Response): Promise<Response> {
        const users = await this.userService.getUsers();

        // If there are no users, return a 404 error with a message
        if (users.length === 0) return notFound('USER');

        // Return all users
        return res.status(HttpStatus.OK).json(users);
    }

    /**
     * Endpoint to get a single user by ID
     * @param {Response} res - An instance of the Express Response object
     * @param {string} id - The ID of the user to retrieve
     * @returns {Promise<Response>} - A Promise that resolves to a response with status code 200 and the user object, or a 404 error if the user is not found
     */
    @Get('filter')
    async getOne(@Res() res: Response, @Query('id') id: string): Promise<Response> {
        const user = await this.userService.getUserById(id);

        // If user is not found, return a 404 error with a message
        if (!user) return notFound('USER');

        // Return the user
        return res.status(HttpStatus.OK).json(user);
    }

    /**
     * Endpoint to create a new user
     * @param {Response} res - An instance of the Express Response object
     * @param {CreateUserDto} createUserDto - A DTO containing the details of the user to be created
     * @returns {Promise<Response>} - A Promise that resolves to a response with status code 200 and a success message, along with the newly created user object
     */
    @Post()
    async create(@Res() res: Response, @Body() createUserDto: CreateUserDto): Promise<Response> {
        const user = await this.userService.createUser(createUserDto);

        return res.status(HttpStatus.OK).json({
            message: 'User created successfully',
            user: user
        });
    }

    /**
     * Endpoint to update an existing user by ID
     * @param {Response} res - An instance of the Express Response object
     * @param {string} id - The ID of the user to update
     * @param {CreateUserDto} createUserDto - A DTO containing the updated details of the user
     * @returns {Promise<Response>} - A Promise that resolves to a response with status code 200 and a success message, along with the updated user object, or a 404 error if the user is not found
     */
    @Patch()
    async update(@Res() res: Response, @Query('id') id: string, @Body() createUserDto: CreateUserDto): Promise<Response> {
        const user = await this.userService.updateUserById(id, createUserDto);

        // If user is not found, return a 404 error with a message
        if (!user) return notFound('USER');

        // Return the updated user
        return res.status(HttpStatus.OK).json({
            message: 'User updated successfully',
            user: user
        });
    }

    /**
     * Endpoint to delete an existing user by ID
     * @param {Response} res - An instance of the Express Response object
     * @param {string} id - The ID of the user to delete
     * @returns {Promise<Response>} - A Promise that resolves to a response with status code 200 and a success message, or a 404 error if the user is not found
     */
    @Delete()
    async delete(@Res() res: Response, @Query('id') id: string): Promise<Response> {
        const user = await this.userService.deleteUserById(id);

        // If user is not found, return a 404 error with a message
        if (!user) return notFound('USER');

        // Return a success message
        return res.status(HttpStatus.OK).json({
            message: 'User deleted successfully'
        });
    }
}
