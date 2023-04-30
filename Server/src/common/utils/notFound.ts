import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export const notFound = (res: Response, entity: string) => {
    return res.status(HttpStatus.NOT_FOUND).json({
        message: `${entity} not found`
    });
};