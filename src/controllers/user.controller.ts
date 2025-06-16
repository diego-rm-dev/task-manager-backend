import { Request, Response } from "express";
import { IUserService } from "../services/user.service";
import { ApiError } from "../errors/error.handler";

export interface IUserController {
    registerUser(req: Request, res: Response): Promise<void>;
    loginUser(req: Request, res: Response): Promise<void>;
    findUserById(req: Request, res: Response): Promise<void>;
    findAllUsers(req: Request, res: Response): Promise<void>;
    updateUser(req: Request, res: Response): Promise<void>;
    deleteUser(req: Request, res: Response): Promise<void>;
}

export class UserController implements IUserController {
    constructor(private readonly userService: IUserService) {}
    
    registerUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password, name } = req.body;
            
            if (!email || !password || !name) {
                throw ApiError.badRequest('Missing required fields', 'Please provide email, password, and name');
            }

            const user = await this.userService.registerUser(req.body);
            res.status(201).json(user);
        } catch (error: any) {
            throw error;
        }
    }

    loginUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;
            
            if (!email || !password) {
                throw ApiError.badRequest('Missing required fields', 'Please provide email and password');
            }

            const user = await this.userService.loginUser(email, password);
            res.status(200).json(user);
        } catch (error: any) {
            throw error;
        }
    }

    findUserById = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await this.userService.findUserById(req.params.id);
            if (!user) {
                throw ApiError.notFound('User not found');
            }
            res.status(200).json(user);
        } catch (error: any) {
            throw error;
        }
    }

    findAllUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const users = await this.userService.findAllUsers();
            res.status(200).json(users);
        } catch (error: any) {
            throw error;
        }
    }

    updateUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await this.userService.updateUser(req.params.id, req.body);
            res.status(200).json(user);
        } catch (error: any) {
            throw error;
        }
    }

    deleteUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await this.userService.deleteUser(req.params.id);
            res.status(200).json(user);
        } catch (error: any) {
            throw error;
        }
    }
}
