import { Response } from "express";
import { LangChainService } from "../services/langchain.service";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";
import { SYSTEM_PROMPT } from "../utils/bot.prompt";
import { getMessageHistory, addMessageToHistory } from "../config/redis";

export class ChatController {
  private langChainService: LangChainService;

  constructor() {
    this.langChainService = new LangChainService();
  }

  async completions(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Usuário não autenticado" });
      }

      const userName = req.user?.full_name?.split(" ")[0] || "";

      const { userMessage } = req.body;
      if (!userMessage) {
        return res.status(400).json({ message: "Mensagem não fornecida" });
      }

      const history = await getMessageHistory(userId);

      let botResponse;
      if (history.length === 0 && this.isGreeting(userMessage)) {
        let initialGreeting =
          "Olá! Sou a Amélia, sua assistente virtual do AgilMed. Como posso ajudar?";

        const presentationMatch = SYSTEM_PROMPT.match(
          /# APRESENTAÇÃO INICIAL:[\s\S]*?\"([\s\S]*?)\"/
        );

        if (presentationMatch) {
          initialGreeting = presentationMatch[1];
          if (userName) {
            initialGreeting = initialGreeting.replace(
              "[nome do usuário]",
              userName
            );
          } else {
            initialGreeting = initialGreeting.replace(
              "[nome do usuário]! ",
              ""
            );
          }
        }

        botResponse = {
          role: "assistant",
          content: initialGreeting,
        };
      } else {
        botResponse = await this.langChainService.processMessage(
          userId,
          userMessage,
          history,
          userName
        );
      }

      await addMessageToHistory(userId, { role: "user", content: userMessage });
      await addMessageToHistory(userId, botResponse);

      const response = {
        choices: [
          {
            message: botResponse,
          },
        ],
      };

      res.json(response);
    } catch (error) {
      console.error("Erro na API de chat:", error);
      res.status(500).json({
        message: "Erro ao processar mensagem",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      });
    }
  }

  private isGreeting(message: string): boolean {
    const greetings = [
      "oi",
      "olá",
      "ola",
      "bom dia",
      "boa tarde",
      "boa noite",
      "ei",
      "hi",
      "hello",
    ];
    const lowerMessage = message.toLowerCase();
    return (
      greetings.some((greeting) => lowerMessage.includes(greeting)) ||
      lowerMessage.length < 10
    );
  }
}
