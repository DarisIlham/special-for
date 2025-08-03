import mongoose from "mongoose";
import { Schema } from "mongoose";

const wishSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // This will automatically add createdAt and updatedAt fields
  }
);

export default mongoose.model("Wish", wishSchema);