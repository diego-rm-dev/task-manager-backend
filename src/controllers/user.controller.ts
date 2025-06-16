import { Request, Response } from "express";
import { IUserService } from "../services/user.service";

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
            const user = await this.userService.registerUser(req.body);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    loginUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await this.userService.loginUser(req.body.email, req.body.password);
            res.status(200).json(user);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    findUserById = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await this.userService.findUserById(req.params.id);
            res.status(200).json(user);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    findAllUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const users = await this.userService.findAllUsers();
            res.status(200).json(users);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    updateUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await this.userService.updateUser(req.params.id, req.body);
            res.status(200).json(user);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    deleteUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await this.userService.deleteUser(req.params.id);
            res.status(200).json(user);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
