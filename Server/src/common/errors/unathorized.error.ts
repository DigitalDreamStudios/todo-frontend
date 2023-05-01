import { HttpException } from '@nestjs/common';

export const unauthorized = (entity: string) => {
    throw new HttpException(`${entity}_INCORRECT`, 401);
};