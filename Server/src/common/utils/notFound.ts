import { HttpStatus } from '@nestjs/common';

export const notFound = (res: any) => {
    return res.status(HttpStatus.NOT_FOUND).json({
        message: 'To do not found'
    });
};