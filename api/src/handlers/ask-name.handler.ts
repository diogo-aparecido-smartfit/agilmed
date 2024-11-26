import { ConversationState } from "../services/chatbot.service";

export const askNameHandler = (session: ConversationState) => {
  session.message = "Eu sou AgilMed. Como posso ajudar você?";
  session.options = ["Agende uma consulta", "Me ajude com medicamentos"];
  return session;
};
