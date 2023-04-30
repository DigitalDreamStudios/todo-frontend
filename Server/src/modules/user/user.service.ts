import { Injectable } from '@nestjs/common';
import { User } from './interface/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    /**
     * Retrieves all User documents from the database
     * @returns A Promise that resolves to an array of all Users
     */
    async getUsers(): Promise<User[]> {
        const users = await this.userModel.find();
        return users;
    }

    /**
     * Retrieves a single User document by ID from the database
     * @param id - The ID of the User document to retrieve
     * @returns A Promise that resolves to the retrieved User
     */
    async getUserById(id: string): Promise<User> {
        const findUser = await this.userModel.findById(id);
        return findUser;
    }

    /**
     * Creates a new User document in the database
     * @param createUserDto - The DTO containing the User information to create
     * @returns A Promise that resolves to the newly created User
     */
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const newUser = new this.userModel(createUserDto);

        // Hash the User's password using bcrypt before saving to the database
        newUser.password = await bcrypt.hash(newUser.password, 10);

        return newUser.save();
    }

    /**
     * Updates an existing User document by ID in the database
     * @param id - The ID of the User document to update
     * @param createUserDto - The DTO containing the User information to update
     * @returns A Promise that resolves to the updated User
     */
    async updateUserById(id: string, createUserDto: CreateUserDto): Promise<User> {
        const updatedUser = await this.userModel.findByIdAndUpdate(id, createUserDto, { new: true });
        return updatedUser;
    }

    /**
     * Deletes an existing User document by ID from the database
     * @param id - The ID of the User document to delete
     * @returns A Promise that resolves to the deleted User
     */
    async deleteUserById(id: string): Promise<User> {
        const deleteUser = await this.userModel.findByIdAndRemove(id);
        return deleteUser;
    }
}