import { Document, Schema } from "mongoose";

export interface ITask extends Document {
    name: string;
    description: string;
    owner: Schema.Types.ObjectId;
    board: Schema.Types.ObjectId;
    status: string;
    start_date: Date;
    due_date: Date;
    priority: string;
    label: Schema.Types.ObjectId;
}

export interface ITaskResponse {
    id: any;
    name: string;
    description: string;
    owner: Schema.Types.ObjectId;
    board: Schema.Types.ObjectId;
    status: string;
    start_date: Date;
    due_date: Date;
    priority: string;
    label: Schema.Types.ObjectId;
}
