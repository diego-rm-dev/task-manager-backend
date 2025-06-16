import { IUser, IUserResponse } from "../interfaces/user.interface";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export interface IUserService {
    registerUser(user: IUser): Promise<IUserResponse>;
    loginUser(email: string, password: string): Promise<IUserResponse | null>;
    findUserById(id: string): Promise<IUserResponse | null>;
    findAllUsers(): Promise<IUserResponse[]>;
    updateUser(id: string, user: Partial<IUser>): Promise<IUserResponse | null>;
    deleteUser(id: string): Promise<IUserResponse | null>;
}

export class UserService implements IUserService {
    constructor(private readonly userModel: typeof User) {}

    registerUser = async (user: IUser): Promise<IUserResponse> => {
        try {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
            const newUser = await this.userModel.create(user) as IUser & { _id: mongoose.Types.ObjectId };
            // Generate JWT token
            const token = jwt.sign(
                { id: newUser._id, email: newUser.email },
                process.env.JWT_SECRET!,
                { expiresIn: '24h' }
            );

            return {
                id: newUser._id.toString(),
                name: newUser.name,
                email: newUser.email,
                token
            };
        } catch (error: any ) {
            throw new Error(`Registration failed: ${error.message}`);
        }
    }

    loginUser = async (email: string, password: string): Promise<IUserResponse | null> => {
        try {
            const user = await this.userModel.findOne({ email }) as IUser & { _id: mongoose.Types.ObjectId };
            if (!user) {
                throw new Error("User not found");
            }
            if (!user.password) {
                throw new Error("User password not found");
            }
            if (!await bcrypt.compare(password, user.password)) {
                throw new Error("Incorrect password");
            }
            
            // Generate JWT token
            const token = jwt.sign(
                { id: user._id, email: user.email },
                process.env.JWT_SECRET!,
                { expiresIn: '24h' }
            );

            return {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                token
            };
        } catch (error: any) {
            throw new Error(`Login failed: ${error.message}`);
        }
    }

    findUserById = async (id: string): Promise<IUserResponse | null> => {
        try {
            // Check if the ID is valid
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return null;
            }
            
            const user = await this.userModel.findById(id) as IUser & { _id: mongoose.Types.ObjectId };
            if (!user) return null;
            return {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
            };
        } catch (error: any) {
            throw new Error(`Failed to find user: ${error.message}`);
        }
    }

    findAllUsers = async (): Promise<IUserResponse[]> => {
        try {
            const users = await this.userModel.find() as Array<IUser & { _id: mongoose.Types.ObjectId }>;
            return users.map((user) => ({
                id: user._id.toString(),
                name: user.name,
                email: user.email,
            }));
        } catch (error: any) {
            throw new Error(`Finding all users failed: ${error.message}`);
        }
    }

    updateUser = async (id: string, user: Partial<IUser>): Promise<IUserResponse | null> => {
        try {
            const updatedUser = await this.userModel.findByIdAndUpdate(id, user, { new: true, runValidators: true }) as IUser & { _id: mongoose.Types.ObjectId };
            if (!updatedUser) {
                throw new Error("User not found");
            }
            return {
                id: updatedUser._id.toString(),
                name: updatedUser.name,
                email: updatedUser.email,
            };
        } catch (error: any) {
            throw new Error(`Update failed: ${error.message}`);
        }
    }

    deleteUser = async (id: string): Promise<IUserResponse | null> => {
        try {
            const deletedUser = await this.userModel.findByIdAndDelete(id) as IUser & { _id: mongoose.Types.ObjectId };
            if (!deletedUser) {
                throw new Error("User not found");
            }
            return {
                id: deletedUser._id.toString(),
                name: deletedUser.name,
                email: deletedUser.email,
            };
        } catch (error: any) {
            throw new Error(`Deletion failed: ${error.message}`);
        }
    }
}