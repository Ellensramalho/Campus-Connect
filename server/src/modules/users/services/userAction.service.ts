import { UserRepository } from "../user.repository.js";

// listar dados de outro usuáiro
export async function ProfileUsersService(userId: string) {

    const user = await UserRepository.findById(userId);

    if(!user){
        throw new Error("Usuário não encontrado.");
    }

    const dataFormated = {
    id: user?._id,
    name: user.name,
    name_user: user.nameUser,
    role: user.role,
    email: user.email,
    avatarUrl: user.avatarUrl,
    biography: user.biography,
    xp: user.xp
  };

  return dataFormated;
}