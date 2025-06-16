import { ITask, ITaskResponse } from "../interfaces/task.interface";
import Task from "../models/task.model";

export interface ITaskService {
    createTask(task: ITask): Promise<ITaskResponse>;
    findTaskById(id: string): Promise<ITaskResponse | null>;
    findAllTasks(): Promise<ITaskResponse[]>;
    updateTask(id: string, task: ITask): Promise<ITaskResponse | null>;
    deleteTask(id: string): Promise<ITaskResponse | null>;
}

export class TaskService implements ITaskService {
    constructor(private readonly taskModel: typeof Task) {}

    createTask = async (task: ITask): Promise<ITaskResponse> => {
        try {
            const newTask = await this.taskModel.create(task);
            return {
                id: newTask._id,
                name: newTask.name,
                description: newTask.description,
                owner: newTask.owner,
                board: newTask.board,
                status: newTask.status,
                start_date: newTask.start_date,
                due_date: newTask.due_date,
                priority: newTask.priority,
                label: newTask.label,
            };
        } catch (error: any) {
            throw new Error(`Creation failed: ${error.message}`);
        }
    }

    findTaskById = async (id: string): Promise<ITaskResponse | null> => {
        try {
            const task = await this.taskModel.findById(id).populate("owner", "name").populate("board", "name").populate("label", "name");
            if (!task) {
                throw new Error("Task not found");
            }
            return {
                id: task._id,
                name: task.name,
                description: task.description,
                owner: task.owner,
                board: task.board,
                status: task.status,
                start_date: task.start_date,
                due_date: task.due_date,
                priority: task.priority,
                label: task.label,
            };
        } catch (error: any) {
            throw new Error(`Finding task by ID failed: ${error.message}`);
        }
    }

    findAllTasks = async (): Promise<ITaskResponse[]> => {
        try {
            const tasks = await this.taskModel.find().populate("owner", "name").populate("board", "name").populate("label", "name");
            return tasks.map((task: ITask) => ({
                id: task._id,
                name: task.name,
                description: task.description,
                owner: task.owner,
                board: task.board,
                status: task.status,
                start_date: task.start_date,
                due_date: task.due_date,
                priority: task.priority,
                label: task.label,
            })) as ITaskResponse[];
        } catch (error: any) {
            throw new Error(`Finding all tasks failed: ${error.message}`);
        }
    }

    updateTask = async (id: string, task: ITask): Promise<ITaskResponse | null> => {
        try {
            const updatedTask = await this.taskModel.findByIdAndUpdate(id, task, { new: true }).populate("owner", "name").populate("board", "name").populate("label", "name");
            if (!updatedTask) {
                throw new Error("Task not found");
            }
            return {
                id: updatedTask._id,
                name: updatedTask.name,
                description: updatedTask.description,
                owner: updatedTask.owner,
                board: updatedTask.board,
                status: updatedTask.status,
                start_date: updatedTask.start_date,
                due_date: updatedTask.due_date,
                priority: updatedTask.priority,
                label: updatedTask.label,
            };
        } catch (error: any) {
            throw new Error(`Updating task failed: ${error.message}`);
        }
    }

    deleteTask = async (id: string): Promise<ITaskResponse | null> => {
        try {
            const deletedTask = await this.taskModel.findByIdAndDelete(id).populate("owner", "name").populate("board", "name").populate("label", "name");
            if (!deletedTask) {
                throw new Error("Task not found");
            }
            return {
                id: deletedTask._id,
                name: deletedTask.name,
                description: deletedTask.description,
                owner: deletedTask.owner,
                board: deletedTask.board,
                status: deletedTask.status,
                start_date: deletedTask.start_date,
                due_date: deletedTask.due_date,
                priority: deletedTask.priority,
                label: deletedTask.label,
            };
        } catch (error: any) {
            throw new Error(`Deleting task failed: ${error.message}`);
        }
    }   
}