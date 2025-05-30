import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/", userController.createUser.bind(userController));

userRouter.get(
  "/",
  authenticateJWT,
  userController.getAllUsers.bind(userController)
);

userRouter.get(
  "/:id",
  authenticateJWT,
  userController.getUserById.bind(userController)
);

userRouter.patch(
  "/:id",
  authenticateJWT,
  userController.updateUser.bind(userController)
);

userRouter.delete(
  "/:id",
  authenticateJWT,
  userController.deleteUser.bind(userController)
);

export default userRouter;
