import { Router } from "express";
import { ChatbotController } from "../controllers/chatbot.controller";

const router = Router();
const chatbotController = new ChatbotController();

router.post("/message", (req, res) => {
  chatbotController.handleMessage(req, res);
});

export default router;
