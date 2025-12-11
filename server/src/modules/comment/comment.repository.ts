import { TComment } from "../../@types/comment/comment.type.js";
import commentModel from "./comment.model.js";

export const CommentRepository = {
  findById(id: string) {
    return commentModel.findById(id);
  },

  create(data: TComment) {
    return commentModel.create(data);
  },

  deleteById(id: string) {
    return commentModel.findByIdAndDelete(id);
  },

  edit(id: string, data: Partial<TComment>) {
    return commentModel.findByIdAndUpdate(id, data, { new: true });
  },

  findAll(id: string) {
    return commentModel.find({ post: id }).populate("author");
  },
};
