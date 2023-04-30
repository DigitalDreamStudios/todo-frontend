import { User } from '../../modules/user/interface/user.interface';

/**
 * Retrieves a single User document by email from the database
 * @param email - The email of the User document to retrieve
 * @returns A Promise that resolves to the retrieved User
**/
export async function findOneByEmail(email: string): Promise<User> {
    const findUser = await this.userModel.findOne({ email });
    return findUser;
}
