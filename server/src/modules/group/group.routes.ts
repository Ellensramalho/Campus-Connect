import { authGuard } from "../../middlewares/AuthGuard.js";
import { CreateGroupController, DeleteGroupController, EditGroupDataController, ListGroupByTeacherController } from "./group.controller.js";
import { Router } from "express";
const groupRouter = Router();


groupRouter.post("/group", authGuard, CreateGroupController);
groupRouter.delete("/group/:id", authGuard, DeleteGroupController);
groupRouter.get("/group/teacher/:id", authGuard, ListGroupByTeacherController);
groupRouter.patch("/edit/group/:id", authGuard, EditGroupDataController);


export default groupRouter;