import { TSocialLinks } from "../../@types/teacher/teacher.type.js";
import { UserRepository } from "../users/user.repository.js";
import { TeacherRepository } from "./teacher.repository.js";

type TBecomeTeacher = {
  userId: string;
  avatarUrl: string;
  area: string;
  expertise: string[];
  socialLinks?: TSocialLinks;
};

export default async function BecomeTeacherService({
  userId,
  avatarUrl,
  area,
  expertise,
  socialLinks,
}: TBecomeTeacher) {
  const user = await UserRepository.findById(userId);

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  const existsTeacher = await TeacherRepository.findByUser(userId);

  if (existsTeacher) throw new Error("Este usuário já é um professor.");

  await UserRepository.update(userId, { role: "professor" });

  const data = {
    user,
    avatarUrl,
    area,
    expertise,
    socialLinks,
  };

  const newTeacher = await TeacherRepository.create(data);

  return {
    msg: "Professor criado com sucesso.",
    professor: newTeacher,
  };
}
