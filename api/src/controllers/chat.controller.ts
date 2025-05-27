import { Request, Response } from "express";
import { ChatService } from "../services/chat.service";
import { handleBotAction } from "../middlewares/bot-actions.middleware";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";

export class ChatController {
  private chatService: ChatService;

  constructor() {
    this.chatService = new ChatService();
  }

  async completions(req: AuthenticatedRequest, res: Response) {
    try {
      const data = await this.chatService.completions(req.body);
      const botMessage = data.choices?.[0]?.message?.content;

      console.log(JSON.stringify(req.user, null, 2));

      let parsed;
      try {
        parsed = JSON.parse(botMessage);
      } catch {
        parsed = null;
      }

      if (parsed && parsed.action && parsed.endpoint) {
        const result = await handleBotAction(parsed.action, parsed.endpoint);

        const newBotResponse = await this.chatService.completions({
          history: [
            ...(req.body.history || []),
            { role: "assistant", content: botMessage },
            { role: "user", content: JSON.stringify(result) },
          ],
          userMessage: "Formate a resposta para o usuário.",
        });

        res.json(newBotResponse);
        return;
      }

      res.json(data);
    } catch (error: any) {
      console.error(
        "[ChatController] Error:",
        error?.response?.data || error.message
      );
      res.status(500).json({
        message: "Erro ao processar requisição do chatbot",
        error: error?.response?.data || error.message,
      });
    }
  }
}
