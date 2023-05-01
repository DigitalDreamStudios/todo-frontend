import { HttpException } from '@nestjs/common';

/**
 * Throws a 404 HttpException with a message that includes the given entity name
 *
 * @param {string} entity - The name of the entity that was not found
 * @throws {HttpException} A 404 HttpException with a message including the entity name
 */
export const notFound = (entity: string) => {
    throw new HttpException(`${entity}_NOT_FOUND`, 404);
};
