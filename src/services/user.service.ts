import { IUser } from "../models/user.model";
import User from "../models/user.model";

interface IUserService {
    registerUser(user: IUser): Promise<IUser>;
    loginUser(email: string, password: string): Promise<IUser | null>;
    findUserById(id: string): Promise<IUser | null>;
    findAllUsers(): Promise<IUser[]>;
    updateUser(id: string, user: Partial<IUser>): Promise<IUser | null>;
    deleteUser(id: string): Promise<IUser | null>;
}

export class UserService implements IUserService {
    constructor(private readonly userModel: typeof User) {}

    async registerUser(user: IUser): Promise<IUser> {
        try {
            return await this.userModel.create(user);
        } catch (error: any ) {
            throw new Error(`Registration failed: ${error.message}`);
        }
    }

    async loginUser(email: string, password: string): Promise<IUser | null> {
        try {
            const user = await this.userModel.findOne({ email });
            if (!user) {
                throw new Error("User not found");
            }
            if (user.password !== password) {
                throw new Error("Incorrect password");
            }
            return user;
        } catch (error: any) {
            throw new Error(`Login failed: ${error.message}`);
        }
    }

    async findUserById(id: string): Promise<IUser | null> {
        try {
            const user = await this.userModel.findById(id);
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (error: any) {
            throw new Error(`Finding user by ID failed: ${error.message}`);
        }
    }

    async findAllUsers(): Promise<IUser[]> {
        try {
            return await this.userModel.find();
        } catch (error: any) {
            throw new Error(`Finding all users failed: ${error.message}`);
        }
    }

    async updateUser(id: string, user: Partial<IUser>): Promise<IUser | null> {
        try {
            const updatedUser = await this.userModel.findByIdAndUpdate(id, user, { new: true, runValidators: true });
            if (!updatedUser) {
                throw new Error("User not found");
            }
            return updatedUser;
        } catch (error: any) {
            throw new Error(`Update failed: ${error.message}`);
        }
    }

    async deleteUser(id: string): Promise<IUser | null> {
        try {
            const deletedUser = await this.userModel.findByIdAndDelete(id);
            if (!deletedUser) {
                throw new Error("User not found");
            }
            return deletedUser;
        } catch (error: any) {
            throw new Error(`Deletion failed: ${error.message}`);
        }
    }
}