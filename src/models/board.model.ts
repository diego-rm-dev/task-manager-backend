import mongoose, { Document, Model, Schema } from "mongoose";

import User from "./user.model";

export interface IBoard extends Document {
  name: string;
  owner: Schema.Types.ObjectId;
  description?: string;
  visibility: "private" | "public" | "team";
}

const BoardSchema = new Schema<IBoard>(
  {
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: User, required: true },
    description: String,
    visibility: {
      type: String,
      enum: ["private", "public", "team"],
      default: "private",
    },
  },
  { timestamps: true }
);

const Board: Model<IBoard> = mongoose.model<IBoard>("Board", BoardSchema);

export default Board;
