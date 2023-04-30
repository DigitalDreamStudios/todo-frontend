import * as bcrypt from 'bcrypt';

/**
 * Compares a plaintext password to a hashed password
 * @param password - The plaintext password to compare
 * @param hashedPassword - The hashed password to compare
 * @returns A Promise that resolves to true if the passwords match, false otherwise
 **/
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    return isPasswordValid;
}
