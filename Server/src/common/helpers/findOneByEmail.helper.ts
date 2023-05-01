import { User } from '../../modules/user/interface/user.interface';
import { notFound } from '../errors/notFound.error';

/**
 * Retrieves a single User document by email from the database
 * @param userModel - The injected User model
 * @param email - The email of the User document to retrieve
 * @returns A Promise that resolves to the retrieved User
 * @throws `USER_NOT_FOUND` error if the User document could not be found
**/
export async function findOneByEmail(userModel: any, email: string): Promise<User> {
    const findUser = await userModel.findOne({ email });

    if (findUser) {
        return findUser;
    } else {
        notFound('USER');
    }
}