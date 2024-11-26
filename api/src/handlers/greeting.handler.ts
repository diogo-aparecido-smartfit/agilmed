import { ConversationState } from "../services/chatbot.service";

export const greetingHandler = (session: ConversationState) => {
  session.message = "Olá, como posso ajudar?";
  session.options = [
    "Agende uma visita a uma clínica",
    "Me mostre a farmácia mais próxima",
  ];
  return session;
};
