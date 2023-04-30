import { Schema } from 'mongoose';

export const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    picture:{
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    } 
});