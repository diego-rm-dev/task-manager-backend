import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/user.interface';
import dotenv from 'dotenv';

dotenv.config();

interface RequestWithUser extends Request {
    user?: IUser;
}

export const authMiddleware = (req: RequestWithUser, res: Response, next: NextFunction): void => {
    try {
        // Get the token from the Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({
                status: 'error',
                message: 'No token provided',
                code: 'NO_TOKEN'
            });
            return; // Explicitly return after sending response
        }

        // Extract the token
        const token = authHeader.split(' ')[1];

        // Verify the token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { user: IUser };
            req.user = decoded.user;
            next();
        } catch (error) {
            res.status(401).json({
                status: 'error',
                message: 'Invalid token',
                code: 'INVALID_TOKEN'
            });
            return; // Explicitly return after sending response
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Authentication error',
            code: 'AUTH_ERROR'
        });
    }
};
