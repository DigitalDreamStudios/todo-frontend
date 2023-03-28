import * as dotenv from 'dotenv';
import { MongooseModuleOptions } from '@nestjs/mongoose';

dotenv.config();

export const databaseConfig: MongooseModuleOptions = {
    uri: process.env.MONGODB_URI,
    useNewUrlParser: true,
};
