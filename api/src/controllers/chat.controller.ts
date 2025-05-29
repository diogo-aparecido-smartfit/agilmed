import { Request, Response } from "express";
import { ChatService } from "../services/chat.service";
import {
  handleBotAction,
  parseAndHandleBotAction,
} from "../middlewares/bot-actions.middleware";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";

export class ChatController {
  private chatService: ChatService;

  constructor() {
    this.chatService = new ChatService();
  }

  async completions(req: AuthenticatedRequest, res: Response) {
    try {
      console.log(
        "[ChatController] completions - req.body:",
        JSON.stringify(req.body, null, 2)
      );
      const userId = req.user?.id;

      if (!userId) {
        res.status(400).json({
          message: "O id do usuário é obrigatório",
        });
        return;
      }

      const data = await this.chatService.completions({
        userId,
        userMessage: req.body.userMessage,
      });

      const botMessage = data.choices?.[0]?.message?.content;

      console.log(
        "[ChatController] completions - botMessage:",
        JSON.stringify(botMessage, null, 2)
      );

      const { handled, result } = await parseAndHandleBotAction(
        botMessage,
        req.user
      );

      console.log(
        "[ChatController] completions - handled:",
        handled,
        "result:",
        result
      );

      if (handled) {
        const newBotResponse = await this.chatService.completions({
          userId,
          userMessage: "Formate a resposta para o usuário.",
        });

        console.log(
          "[ChatController] completions - newBotResponse:",
          JSON.stringify(newBotResponse, null, 2)
        );
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
