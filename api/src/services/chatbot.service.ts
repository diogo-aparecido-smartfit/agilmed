import { NLPProcessor } from "../utils/nlp.processor";
import { handlerOptions } from "../handlers/index";

export type ConversationState = {
  lastIntent: string;
  message: string;
  options: string[];
};

export class ChatbotService {
  private nlpProcessor: NLPProcessor;
  private userSessions: Map<string, ConversationState>;

  constructor() {
    this.nlpProcessor = new NLPProcessor();
    this.userSessions = new Map();
  }

  public processMessage(
    userId: string,
    message: string
  ): { message: string; options: string[] } {
    let session = this.userSessions.get(userId);

    if (!session) {
      session = {
        lastIntent: "",
        message:
          "Olá, eu sou AgilMed, seu assistente pessoal para agendamentos clínicos. No que posso ser útil hoje?",
        options: [
          "Agende uma visita a uma clínica",
          "Me mostre a farmácia mais próxima",
        ],
      };
      this.userSessions.set(userId, session);
    }

    const intent = this.nlpProcessor.classify(message);

    const handler =
      handlerOptions[
        intent as
          | "greeting"
          | "ask_name"
          | "request_pharmacy"
          | "request_clinic"
      ];

    if (handler) {
      session = handler(session);
    } else {
      session.message = "Desculpe, não entendi. Pode tentar novamente?";
      session.options = [
        "Agende uma visita a uma clínica",
        "Me mostre a farmácia mais próxima",
      ];
    }

    this.userSessions.set(userId, session);

    return { message: session.message, options: session.options };
  }

  public resetConversation(userId: string): void {
    this.userSessions.delete(userId);
  }
}
