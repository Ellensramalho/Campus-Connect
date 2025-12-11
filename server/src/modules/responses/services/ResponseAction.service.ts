import { Types } from "mongoose";
import { TResponse } from "../../../@types/response/response.type.js";
import { CommentRepository } from "../../comment/comment.repository.js";
import { UserRepository } from "../../users/user.repository.js";
import { ResponseRepository } from "../response.repository.js";
import { ToggleLike } from "../../../services/Like.service.js";

// Criar resposta
export async function CreateResponseService(
  authorId: string,
  commentId: string,
  content: string
) {
  const author = await UserRepository.findById(authorId);

  if (!author) {
    throw new Error("Author não encontrado.");
  }

  const comment = await CommentRepository.findById(commentId);

  if (!comment) {
    throw new Error("Comentário não encontrado.");
  }

  if (!content) {
    throw new Error("Conteúdo inválido.");
  }

  const authorObjectId = new Types.ObjectId(author._id);
  const commentObjectId = new Types.ObjectId(comment._id);

  const data: TResponse = {
    author: authorObjectId,
    comment: commentObjectId,
    content: content,
  };

  const newResponse = await ResponseRepository.create(data);

  return {
    msg: "Resposta adicionada com sucesso.",
    response: newResponse,
  };
}

// Excluir resposta
export async function DeleteResponseService(responseId: string) {
  const response = await ResponseRepository.findById(responseId);

  if (!response) {
    throw new Error("Resposta não encontrada.");
  }

  await ResponseRepository.delete(responseId);

  return {
    msg: "Resposta deletada com sucesso.",
  };
}

type TUpdatesResponse = {
  content: string;
};

// Editar resposta
export async function EditResponseService(
  responseId: string,
  userId: string,
  updates: TUpdatesResponse
) {
  const response = await ResponseRepository.findById(responseId);

  if (!response) {
    throw new Error("Resposta não encontrada.");
  }

  const user = await UserRepository.findById(userId);

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  if (response.author.toString() !== user._id.toString()) {
    throw new Error("Permissão insuficiente.");
  }

  if (!updates.content) {
    throw new Error("Conteúdo inválido.");
  }

  const newResponse = await ResponseRepository.update(responseId, updates);

  return {
    msg: "Resposta editada com sucesso.",
    new: newResponse,
  };
}

// Curtir resposta
export async function LikeResponseService(userId: string, responseId: string) {
  return ToggleLike({
    userId,
    entityName: "Resposta",
    entityId: responseId,
    entityRepository: ResponseRepository,
    userRepository: UserRepository,
  });
}
