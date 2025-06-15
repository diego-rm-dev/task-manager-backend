import Task, { ITask } from "../models/task.model";

export interface ITaskService {
    createTask(task: ITask): Promise<ITask>;
    findTaskById(id: string): Promise<ITask | null>;
    findAllTasks(): Promise<ITask[]>;
    updateTask(id: string, task: ITask): Promise<ITask | null>;
    deleteTask(id: string): Promise<ITask | null>;
}

export class TaskService implements ITaskService {
    constructor(private readonly taskModel: typeof Task) {}

    public async createTask(task: ITask): Promise<ITask> {
        try {
            return await this.taskModel.create(task);
        } catch (error: any) {
            throw new Error(`Creation failed: ${error.message}`);
        }
    }

    public async findTaskById(id: string): Promise<ITask | null> {
        try {
            const task = await this.taskModel.findById(id);
            if (!task) {
                throw new Error("Task not found");
            }
            return task;
        } catch (error: any) {
            throw new Error(`Finding task by ID failed: ${error.message}`);
        }
    }

    public async findAllTasks(): Promise<ITask[]> {
        try {
            return await this.taskModel.find();
        } catch (error: any) {
            throw new Error(`Finding all tasks failed: ${error.message}`);
        }
    }

    public async updateTask(id: string, task: ITask): Promise<ITask | null> {
        try {
            const updatedTask = await this.taskModel.findByIdAndUpdate(id, task, { new: true });
            if (!updatedTask) {
                throw new Error("Task not found");
            }
            return updatedTask;
        } catch (error: any) {
            throw new Error(`Updating task failed: ${error.message}`);
        }
    }

    public async deleteTask(id: string): Promise<ITask | null> {
        try {
            const deletedTask = await this.taskModel.findByIdAndDelete(id);
            if (!deletedTask) {
                throw new Error("Task not found");
            }
            return deletedTask;
        } catch (error: any) {
            throw new Error(`Deleting task failed: ${error.message}`);
        }
    }   
}