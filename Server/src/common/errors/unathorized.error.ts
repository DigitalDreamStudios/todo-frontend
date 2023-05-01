import { HttpException } from '@nestjs/common';

/**
 * Throws a 401 HttpException with a message that includes the given entity name
 *
 * @param {string} entity - The name of the entity that is unauthorized
 * @throws {HttpException} A 401 HttpException with a message including the entity name
 */
export const unauthorized = (entity: string) => {
    throw new HttpException(`${entity}_INCORRECT`, 401);
};
