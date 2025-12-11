import { TChallenge } from "../../@types/challenge/challenge.type.js";
import challengeModel from "./challenge.model.js";

export const ChallengeRepository = {
  findByGroup(id: string) {
    return challengeModel.find({ group: id }).populate({
      path: "author",
      populate: {
        path: "user",
        select: "name email role",
      },
    });
  },

  create(data: TChallenge) {
    return challengeModel.create(data);
  },

  findById(id: string) {
    return challengeModel.findById(id);
  },

  delete(id: string) {
    return challengeModel.findByIdAndDelete(id);
  },
};
