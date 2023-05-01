import { HttpException } from '@nestjs/common';

export const notFound = (entity: string) => {
    throw new HttpException(`${entity}_NOT_FOUND`, 404);
};