import { ConversationState } from "../services/chatbot.service";

export const requestPharmacyHandler = (session: ConversationState) => {
  session.message = "Ok, que tal essa farmácia?";
  session.options = ["Farmácia X", "Farmácia Y", "Farmácia Z"];
  return session;
};
