import mongoose, { Schema } from "mongoose";
import { TResponse } from "../../@types/response/response.type.js";

const ResponseSchema = new mongoose.Schema<TResponse>({
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  comment: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Comment",
  },

  content: {
    type: String,
    required: true,
  },

  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Response", ResponseSchema);
