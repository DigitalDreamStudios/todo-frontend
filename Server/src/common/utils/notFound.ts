import { HttpStatus } from '@nestjs/common';

export const notFound = (res: any, entity: string) => {
    return res.status(HttpStatus.NOT_FOUND).json({
        message: `${entity} not found`
    });
};