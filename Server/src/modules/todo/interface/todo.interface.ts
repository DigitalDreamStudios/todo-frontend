import { Document } from 'mongoose';

export interface Todo extends Document {
    description: string;
    status: boolean;
}