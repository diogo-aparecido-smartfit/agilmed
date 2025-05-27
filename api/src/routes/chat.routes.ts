import { Router } from "express";
import { ChatController } from "../controllers/chat.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";

const router = Router();
const chatController = new ChatController();

router.post("/completions", authenticateJWT, (req, res) => {
  chatController.completions(req, res);
});

export default router;
