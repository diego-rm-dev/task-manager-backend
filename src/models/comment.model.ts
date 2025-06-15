import mongoose, { Document, Model, Schema } from "mongoose";
import User from "./user.model";
import Task from "./task.model";

export interface IComment extends Document {
    content: string;
    user: mongoose.Schema.Types.ObjectId;
    task: mongoose.Schema.Types.ObjectId;
}

const CommentSchema = new Schema({
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: User, required: true },
    task: { type: Schema.Types.ObjectId, ref: Task, required: true },
}, { timestamps: true });

const Comment: Model<IComment> = mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
