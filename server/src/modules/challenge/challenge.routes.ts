import { authGuard } from "../../middlewares/AuthGuard.js";
import { CreateChallengeController, DeleteChallengeController, ListChallengeByGroupController } from "./challenge.controller.js";
import { Router } from "express";
const challengeRouter = Router();


challengeRouter.post("/challenge/group/:id", authGuard, CreateChallengeController);
challengeRouter.delete("/challenge/:id", authGuard, DeleteChallengeController);
challengeRouter.get("/challenges/group/:id", authGuard, ListChallengeByGroupController);


export default challengeRouter;