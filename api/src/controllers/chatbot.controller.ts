import { Request, Response } from "express";
import { ChatbotService } from "../services/chatbot.service";

export class ChatbotController {
  private chatbotService: ChatbotService;

  constructor() {
    this.chatbotService = new ChatbotService();
  }

  // Método para processar a mensagem do usuário
  public async handleMessage(req: Request, res: Response): Promise<void> {
    const { userId, message } = req.body;

    // Processa a mensagem do usuário e recebe a resposta do bot
    const { message: botMessage, options } = this.chatbotService.processMessage(
      userId,
      message
    );

    // Envia a resposta para o front-end
    res.json({ message: botMessage, options });
  }
}
