import { authGuard } from "../../middlewares/AuthGuard.js";
import {
  LoginController,
  ProfileController,
  ProfileEditController,
  RegisterController,
  SearchUserController,
} from "./user.controller.js";
import { Router } from "express";
const userRouter = Router();

userRouter.post("/auth/register", RegisterController);
userRouter.post("/auth/login", LoginController);
userRouter.get("/auth/profile", authGuard, ProfileController);
userRouter.patch("/auth/profile-edit", authGuard, ProfileEditController);
userRouter.get("/search/user", authGuard, SearchUserController);

export default userRouter;
