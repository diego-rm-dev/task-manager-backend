import { Document, Schema } from "mongoose";

export interface IUser extends Document{
    name: string;
    lastname?: string;
    username: string;
    email: string;
    password: string;
    age?: number;
    role: "user" | "admin";
}

export interface IUserResponse {
    id: string;
    name: string;
    email: string;
    token?: string;
}