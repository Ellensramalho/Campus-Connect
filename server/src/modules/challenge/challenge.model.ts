import mongoose, { Types } from "mongoose";

const QuizQuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answers: { type: [String], required: true },
    correct: { type: Number, required: true },
  },
  { _id: false }
);

const QuizSchema = new mongoose.Schema(
  {
    questions: {
      type: [QuizQuestionSchema],
      required: false,
      default: undefined,
    },
  },
  {
    _id: false,
    id: false,
  }
);

const ChallengeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    description: { type: String, required: true },

    author: {
      type: Types.ObjectId,
      required: true,
      ref: "Teacher",
    },

    group: {
      type: Types.ObjectId,
      required: true,
      ref: "Group",
    },

    type: {
      type: String,
      enum: ["xp", "quiz", "timer"],
      required: true,
    },

    data: {
      xp: { type: Number, required: false, default: undefined },
      timer: { type: Number, required: false, default: undefined },

      quiz: {
        type: QuizSchema,
        required: false,
        default: undefined,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Challenge", ChallengeSchema);
