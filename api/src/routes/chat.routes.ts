import { Router } from "express";
import { ChatController } from "../controllers/chat.controller";

const chatRouter = Router();
const chatController = new ChatController();

chatRouter.post(
  "/completions",
  chatController.completions.bind(chatController)
);

export default chatRouter;
