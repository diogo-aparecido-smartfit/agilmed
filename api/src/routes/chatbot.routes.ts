import { Router } from "express";
import { ChatbotController } from "../controllers/chatbot.controller";

const router = Router();
const chatbotController = new ChatbotController();

/**
 * @openapi
 * /api/chatbot/message:
 *   post:
 *     summary: Envia mensagem para o chatbot
 *     tags:
 *       - Chatbot
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID do usuário
 *               message:
 *                 type: string
 *                 description: Mensagem a ser enviada ao chatbot
 *     responses:
 *       200:
 *         description: Resposta do chatbot
 */
router.post("/message", (req, res) => {
  chatbotController.handleMessage(req, res);
});

export default router;
