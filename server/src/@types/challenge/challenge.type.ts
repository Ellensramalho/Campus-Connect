import { Types } from "mongoose";

type TData = {
    xp?: number;
    timer?: number;
    quiz?: {
      questions: {
        question: string;
        answers: string[];
        correct: number;
      }[];
    };
}

export type TChallenge = {
  _id?: string;
  title: string;
  description: string;
  type: "xp" | "quiz" | "timer";
  author: Types.ObjectId;
  group: Types.ObjectId;
  data: TData;
};
