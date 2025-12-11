import mongoose, { Schema } from "mongoose";
import { TComment } from "../../@types/comment/comment.type.js";

const CommentSchema = new mongoose.Schema<TComment>({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
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

export default mongoose.model("Comment", CommentSchema);
