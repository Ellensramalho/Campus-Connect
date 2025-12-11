import { Response } from "express";
import { CustomRequest } from "../../middlewares/AuthGuard.js";
import {
  CreateChallengeService,
  DeleteChallengeService,
} from "./services/challengeAction.service.js";
import { ListChallengeByGroupService } from "./services/challengeList.service.js";

export async function CreateChallengeController(
  req: CustomRequest,
  res: Response
) {
  try {
    const authorId = req.user._id;

    const groupId = req.params.id;

    const { title, description, type, data } = req.body;

    const result = await CreateChallengeService({
      authorId,
      groupId,
      title,
      description,
      type,
      data,
    });

    res.status(201).json({ msg: result.msg, challenge: result.challenge });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

// Deletar desafio
export async function DeleteChallengeController(
  req: CustomRequest,
  res: Response
) {
  try {
    const userId = req.user._id;

    const challengeId = req.params.id;

    const result = await DeleteChallengeService(userId, challengeId);

    res.status(200).json(result.msg);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

// Listar desafios de um grupo
export async function ListChallengeByGroupController(
  req: CustomRequest,
  res: Response
) {

  try{

    const groupId = req.params.id;

    const result = await ListChallengeByGroupService(groupId);

    res.status(200).json(result.formatedData);

  }
  catch(err: any){
    res.status(500).json({ error: err.message });
  }

}
