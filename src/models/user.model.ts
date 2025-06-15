import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
    name: string;
    lastname?: string;
    username: string;
    email: string;
    password: string;
    age?: number;
    role: "user" | "admin";
}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        lastname: String,
        username: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        age: Number,
        role: { type: String, enum: ["user", "admin"], default: "user" },
    },
    { timestamps: true }
);

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
