import mongoose, { Model, Schema } from "mongoose";

import User from "./user.model";
import Board from "./board.model";
import Label from "./label.model";
import { ITask } from "../interfaces/task.interface";

const TaskSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    owner: { type: Schema.Types.ObjectId, ref: User, required: true },
    board: { type: Schema.Types.ObjectId, ref: Board, required: true },
    status: { type: String, enum: ['todo', 'in_progress', 'done'], default: 'todo' },
    start_date: Date,
    due_date: Date,
    priority: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
    label: { type: Schema.Types.ObjectId, ref: Label },
  }, { timestamps: true });
  
const Task: Model<ITask> = mongoose.model<ITask>("Task", TaskSchema);

export default Task;
