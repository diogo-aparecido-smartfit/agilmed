import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/", userController.createUser.bind(userController));
userRouter.get("/", userController.getAllUsers.bind(userController));
userRouter.get("/:id", userController.getUserById.bind(userController));
userRouter.patch("/:id", userController.updateUser.bind(userController));
userRouter.delete("/:id", userController.deleteUser.bind(userController));

export default userRouter;
