import mongoose, { Schema } from "mongoose";
import { TTeacher } from "../../@types/teacher/teacher.type.js";

const TeacherSchema = new mongoose.Schema<TTeacher>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },

  bio: {
    type: String,
    default: "",
  },

  area: {
    type: String,
    required: true,
  },

  expertise: {
    type: [String],
    default: [],
  },

  avatarUrl: {
    type: String,
    default: "",
  },

  groups: [
    {
      type: Schema.Types.ObjectId,
      ref: "Classroom",
    },
  ],

  isVerified: {
    type: Boolean,
    default: false,
  },

  verifiedAt: {
    type: Date,
    default: null,
  },

  socialLinks: {
    github: String,
    linkedin: String,
    lattes: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Teacher", TeacherSchema);
