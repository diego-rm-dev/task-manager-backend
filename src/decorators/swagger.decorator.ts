import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from 'express-serve-static-core';

export const swaggerDocument = (options: any): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        res.locals.swagger = options;
        next();
    };
};

export const api = (options: any) => {
    return swaggerDocument({
        api: options
    });
};

export const get = (options: any) => {
    return swaggerDocument({
        get: options
    });
};

export const post = (options: any) => {
    return swaggerDocument({
        post: options
    });
};

export const put = (options: any) => {
    return swaggerDocument({
        put: options
    });
};

export const deleteMethod = (options: any) => {
    return swaggerDocument({
        delete: options
    });
};
