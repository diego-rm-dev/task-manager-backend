import mongoose, { Model } from "mongoose";
import User from "./user.model";
import Board from "./board.model";
import { ICollaborator } from "../interfaces/collaborator.interface";

const CollaboratorSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
    board: { type: mongoose.Schema.Types.ObjectId, ref: Board, required: true },
    role: { type: String, enum: ['owner', 'editor', 'viewer'], default: 'viewer' }
}, { timestamps: true });

const Collaborator: Model<ICollaborator> = mongoose.model<ICollaborator>("Collaborator", CollaboratorSchema);

export default Collaborator;
