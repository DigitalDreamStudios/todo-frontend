import * as dotenv from 'dotenv';
import { MongooseModuleOptions } from '@nestjs/mongoose';

// Load environment variables from the .env file
dotenv.config();

/**
 * Configuration options for connecting to a MongoDB database using Mongoose
 *
 * @property {string} uri - The connection URI for the database
 * @property {boolean} useNewUrlParser - Whether to use the new MongoDB connection string parser
 */
export const databaseConfig: MongooseModuleOptions = {
    uri: process.env.MONGODB_URI,
    useNewUrlParser: true,
};
