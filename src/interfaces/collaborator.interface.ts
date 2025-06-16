import { Document, Schema } from "mongoose";

export interface ICollaborator extends Document {
    user: Schema.Types.ObjectId;
    board: Schema.Types.ObjectId;
    role: 'owner' | 'editor' | 'viewer';
}

export interface ICollaboratorResponse {
    id: any;
    user: Schema.Types.ObjectId;
    board: Schema.Types.ObjectId;
    role: 'owner' | 'editor' | 'viewer';
}
