import { Router } from "express";
import { ChatController } from "../controllers/chat.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { debugMiddleware } from "../middlewares/debug.middleware";

const router = Router();
const chatController = new ChatController();

router.use("/message", debugMiddleware);
router.post("/message", authenticateJWT, (req, res) => {
  chatController.completions(req, res);
});

export default router;
