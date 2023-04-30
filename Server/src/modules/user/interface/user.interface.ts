import { Document } from 'mongoose';

export interface User extends Document {
    username: string;
    email: string;
    picture: string;
    password: string;
}