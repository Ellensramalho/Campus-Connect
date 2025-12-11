import { TAuthor } from "../../../@types/post/post.type.js";
import { ChallengeRepository } from "../challenge.repository.js";

export async function ListChallengeByGroupService(groupId: string){
    const challenge = await ChallengeRepository.findByGroup(groupId);

    if(!challenge) throw new Error("Desafio não encontrado.");

    if(challenge.length === 0) throw new Error("Nenhum desafio");

    const formatedData = challenge.map((c) => {

        const author = c.author as unknown as TAuthor;
        const user = author.user

        return {
            id: c._id,
            title: c.title,
            description: c.description,
            type: c.type,
            data: c.data,
            author: author ? {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            } : null
        }
    })

    return {
        formatedData
    }
}