import { Request, Response } from "express";
import { ChatService } from "../services/chat.service";

export class ChatController {
  private chatService: ChatService;

  constructor() {
    this.chatService = new ChatService();
  }

  async completions(req: Request, res: Response) {
    try {
      const data = await this.chatService.completions(req.body);
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
