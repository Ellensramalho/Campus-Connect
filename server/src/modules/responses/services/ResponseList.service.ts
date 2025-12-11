import { TResponse } from "../../../@types/response/response.type.js";
import { CommentRepository } from "../../comment/comment.repository.js";
import { ResponseRepository } from "../response.repository.js";

export async function ListResponsesService(commentId: string) {
  const comment = await CommentRepository.findById(commentId);

  if (!comment) {
    throw new Error("Comentário não encontrado.");
  }

  const responses = await ResponseRepository.findAll(commentId);

  const formatedData = responses.map((res) => ({
    id: res._id.toString(),
    author: {
      id: (res.author as any)._id,
      name: (res.author as any)?.name,
      email: (res.author as any)?.email,
      role: (res.author as any)?.role,
    },
    content: res.content,
    likes: res.likes,
    createdAt: res.createdAt,
  }));

  return { count: responses.length, formatedData };
}
