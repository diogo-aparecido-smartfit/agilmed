import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { debugMiddleware } from "../middlewares/debug.middleware";
import { ControllerFactory } from "../di/factories/controller.factory";

const router = Router();
const chatController = ControllerFactory.createChatController();

/**
 * @openapi
 * /api/chat/message:
 *   post:
 *     summary: Envia uma mensagem para o chat
 *     tags:
 *       - Chat
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: Texto da mensagem a ser processada
 *               sessionId:
 *                 type: string
 *                 description: ID da sessão de chat (opcional)
 *     responses:
 *       200:
 *         description: Resposta gerada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: Resposta gerada pelo sistema
 *                 sessionId:
 *                   type: string
 *                   description: ID da sessão de chat
 *       401:
 *         description: Não autorizado, autenticação necessária
 *       500:
 *         description: Erro no servidor ao processar a mensagem
 */
router.use("/message", debugMiddleware);
router.post("/message", authenticateJWT, (req, res) => {
  chatController.completions(req, res);
});

export default router;
