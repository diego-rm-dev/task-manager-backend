import mongoose, { Document, Model, Schema } from "mongoose";

export interface ILabel extends Document {
    name: string;
    color: string;
}

const LabelSchema = new Schema({
    name: { type: String, required: true },
    color: { type: String, required: true },
}, { timestamps: true });

const Label: Model<ILabel> = mongoose.model<ILabel>("Label", LabelSchema);

export default Label;
