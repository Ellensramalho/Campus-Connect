import { Types } from "mongoose";
import { GroupRepository } from "../../group/group.repository.js";
import { TeacherRepository } from "../../teacher/teacher.repository.js";
import { ChallengeRepository } from "../challenge.repository.js";

type TDataCreate = {
  authorId: string;
  groupId: string;
  title: string;
  description: string;
  type: "xp" | "quiz" | "timer";
  data: any;
};

export async function CreateChallengeService({
  authorId,
  groupId,
  title,
  description,
  type,
  data,
}: TDataCreate) {
  // verificar professor
  const author = await TeacherRepository.findByUser(authorId);
  if (!author) throw new Error("Professor não encontrado.");

  // verificar grupo
  const group = await GroupRepository.findById(groupId);
  if (!group) throw new Error("Grupo não encontrado.");

  // validação por tipo
  if (type === "xp") {
    if (!data?.xp) throw new Error("XP é obrigatório.");
  }

  if (type === "timer") {
    if (!data?.timer) throw new Error("Timer é obrigatório.");
  }

  if (type === "quiz") {
    if (!data?.quiz?.questions || data.quiz.questions.length === 0) {
      throw new Error("Quiz deve ter pelo menos 1 questão.");
    }
  }

  const created = await ChallengeRepository.create({
    title,
    description,
    type,
    author: new Types.ObjectId(author._id),
    group: new Types.ObjectId(groupId),
    data,
  });

  return {
    msg: "Desafio criado com sucesso.",
    challenge: created,
  };
}

// Deletar desafio
export async function DeleteChallengeService(userId: string, challengeId: string){

  const teacher = await TeacherRepository.findByUser(userId);

  if(!teacher) throw new Error("Professor não encontrado.");

  const challenge = await ChallengeRepository.findById(challengeId);

  if(!challenge) throw new Error("Desafio não encontrado.");

  if(challenge.author.toString() !== teacher._id.toString()){
    throw new Error("Permissões insuficientes.");
  }

  await ChallengeRepository.delete(challengeId);

  return {
    msg: "Desafio deletado com sucesso."
  }
}
