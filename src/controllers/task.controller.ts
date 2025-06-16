import { Request, Response } from "express";
import { ITaskService } from "../services/task.service";
import { ApiError } from "../errors/error.handler";

export interface ITaskController {
    createTask(req: Request, res: Response): Promise<void>;
    findTaskById(req: Request, res: Response): Promise<void>;
    findAllTasks(req: Request, res: Response): Promise<void>;
    updateTask(req: Request, res: Response): Promise<void>;
    deleteTask(req: Request, res: Response): Promise<void>;
}

export class TaskController implements ITaskController {
    constructor(private readonly taskService: ITaskService) {}

    createTask = async (req: Request, res: Response): Promise<void> => {
        try {
            const { title, description, status, boardId } = req.body;
            
            if (!title || !description || !status || !boardId) {
                throw ApiError.badRequest('Missing required fields', 'Please provide title, description, status, and boardId');
            }

            const task = await this.taskService.createTask(req.body);
            res.status(201).json(task);
        } catch (error: any) {
            throw error;
        }
    }

    findTaskById = async (req: Request, res: Response): Promise<void> => {
        try {
            const task = await this.taskService.findTaskById(req.params.id);
            if (!task) {
                throw ApiError.notFound('Task not found');
            }
            res.status(200).json(task);
        } catch (error: any) {
            throw error;
        }
    }

    findAllTasks = async (req: Request, res: Response): Promise<void> => {
        try {
            const tasks = await this.taskService.findAllTasks();
            res.status(200).json(tasks);
        } catch (error: any) {
            throw error;
        }
    }

    updateTask = async (req: Request, res: Response): Promise<void> => {
        try {
            const task = await this.taskService.findTaskById(req.params.id);
            if (!task) {
                throw ApiError.notFound('Task not found');
            }

            const updatedTask = await this.taskService.updateTask(req.params.id, req.body);
            res.status(200).json(updatedTask);
        } catch (error: any) {
            throw error;
        }
    }

    deleteTask = async (req: Request, res: Response): Promise<void> => {
        try {
            const task = await this.taskService.findTaskById(req.params.id);
            if (!task) {
                throw ApiError.notFound('Task not found');
            }

            await this.taskService.deleteTask(req.params.id);
            res.status(200).json({ message: 'Task deleted successfully' });
        } catch (error: any) {
            throw error;
        }
    }
}