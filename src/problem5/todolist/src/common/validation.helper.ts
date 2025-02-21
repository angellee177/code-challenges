import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { errorResponse } from './response.helper';

/**
 * Middleware to validate the request and return errors if any.
 */
export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json(errorResponse('Validation error', errors.array()));
        return;
    }

    next();
};
