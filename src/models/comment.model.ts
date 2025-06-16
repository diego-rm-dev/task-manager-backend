import mongoose, { Model, Schema } from "mongoose";
import User from "./user.model";
import Task from "./task.model";
import { IComment } from "../interfaces/comment.interface";

const CommentSchema = new Schema({
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: User, required: true },
    task: { type: Schema.Types.ObjectId, ref: Task, required: true },
}, { timestamps: true });

const Comment: Model<IComment> = mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
