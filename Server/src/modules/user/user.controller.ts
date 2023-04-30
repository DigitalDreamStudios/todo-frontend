import { Body, Controller, Delete, Get, HttpStatus, Patch, Post, Query, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { notFound } from 'src/common/utils/notFound';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    // Endpoint for creating a new user
    @Post('/create')
    async create(@Res() res: any, @Body() createUserDto: CreateUserDto) {
        const user = await this.userService.createUser(createUserDto);

        return res.status(HttpStatus.OK).json({
            message: 'User created successfully',
            user: user
        });
    }

    // Endpoint for getting all users
    @Get('/getAll')
    async getAll(@Res() res: any) {
        const users = await this.userService.getUsers();

        // If there are no users, return a 404 error with a message
        if (users.length === 0) return notFound(res, 'User');

        // Return all users
        return res.status(HttpStatus.OK).json(users);
    }

    // Endpoint for getting a single user by id
    @Get('/getOne')
    async getOne(@Res() res: any, @Query('id') id: string) {
        const user = await this.userService.getUserById(id);

        // If user is not found, return a 404 error with a message
        if (!user) return notFound(res, 'User');

        // Return the user
        return res.status(HttpStatus.OK).json(user);
    }

    // Endpoint for updating a user by id
    @Patch('/update')
    async update(@Res() res: any, @Query('id') id: string, @Body() createUserDto: CreateUserDto) {
        const user = await this.userService.updateUserById(id, createUserDto);

        // If user is not found, return a 404 error with a message
        if (!user) return notFound(res, 'User');

        // Return the updated user
        return res.status(HttpStatus.OK).json({
            message: 'User updated successfully',
            user: user
        });
    }

    // Endpoint for deleting a user by id
    @Delete('/delete')
    async delete(@Res() res: any, @Query('id') id: string) {
        const user = await this.userService.deleteUserById(id);

        // If user is not found, return a 404 error with a message
        if (!user) return notFound(res, 'User');

        // Return a success message
        return res.status(HttpStatus.OK).json({
            message: 'User deleted successfully'
        });
    }
}
