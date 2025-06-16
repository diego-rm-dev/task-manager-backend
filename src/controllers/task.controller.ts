import { Request, Response } from "express";
import { ITaskService } from "../services/task.service";

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
            const task = await this.taskService.createTask(req.body);
            res.status(201).json(task);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    findTaskById = async (req: Request, res: Response): Promise<void> => {
        try {
            const task = await this.taskService.findTaskById(req.params.id);
            res.status(200).json(task);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    findAllTasks = async (req: Request, res: Response): Promise<void> => {
        try {
            const tasks = await this.taskService.findAllTasks();
            res.status(200).json(tasks);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    updateTask = async (req: Request, res: Response): Promise<void> => {
        try {
            const task = await this.taskService.updateTask(req.params.id, req.body);
            res.status(200).json(task);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    deleteTask = async (req: Request, res: Response): Promise<void> => {
        try {
            const task = await this.taskService.deleteTask(req.params.id);
            res.status(200).json(task);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}