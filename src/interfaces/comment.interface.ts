import { Document, Schema } from "mongoose";

export interface IComment extends Document {
    content: string;
    user: Schema.Types.ObjectId;
    task: Schema.Types.ObjectId;
}

export interface ICommentResponse {
    id: any;
    content: string;
    user: Schema.Types.ObjectId;
    task: Schema.Types.ObjectId;
}
