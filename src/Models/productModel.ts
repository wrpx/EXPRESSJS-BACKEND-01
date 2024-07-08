import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  detail: string;
  price: number;
}

const productSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    detail: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", productSchema);