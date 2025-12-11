import { TResponse } from "../../@types/response/response.type.js";
import responseModel from "./response.model.js";

export const ResponseRepository = {
  create(data: TResponse) {
    return responseModel.create(data);
  },

  findById(id: string) {
    return responseModel.findById(id);
  },

  delete(id: string) {
    return responseModel.findByIdAndDelete(id);
  },

  update(id: string, data: Partial<TResponse>) {
    return responseModel.findByIdAndUpdate(id, data, { new: true });
  },

  findAll(commentId: string) {
    return responseModel.find({ comment: commentId }).populate("author").sort({
      createdAt: 1,
    });
  },
};
