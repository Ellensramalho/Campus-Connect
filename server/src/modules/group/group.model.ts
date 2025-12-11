import mongoose, { Schema } from "mongoose";
import { TGroup } from "../../@types/group/group.type.js";

const GroupSchema = new mongoose.Schema<TGroup>({
  author: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
  },

  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  members: [
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

export default mongoose.model("Group", GroupSchema);
