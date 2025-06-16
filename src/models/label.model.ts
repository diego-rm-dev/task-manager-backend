import mongoose, { Document, Model, Schema } from "mongoose";
import { ILabel } from "../interfaces/label.interface";

const LabelSchema = new Schema({
    name: { type: String, required: true },
    color: { type: String, required: true },
}, { timestamps: true });

const Label: Model<ILabel> = mongoose.model<ILabel>("Label", LabelSchema);

export default Label;
