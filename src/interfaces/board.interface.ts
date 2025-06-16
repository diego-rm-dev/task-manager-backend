import { Document, Schema } from "mongoose";

export interface IBoard extends Document{
    name: string;
    owner: Schema.Types.ObjectId;
    description?: string;
    visibility: "private" | "public" | "team";
}

export interface IBoardResponse {
    name: string;
    owner: Schema.Types.ObjectId;
    description?: string;
    visibility: "private" | "public" | "team";
}
