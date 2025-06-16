import { Document } from "mongoose";

export interface ILabel extends Document {
    name: string;
    color: string;
}

export interface ILabelResponse {
    id: any;
    name: string;
    color: string;
}