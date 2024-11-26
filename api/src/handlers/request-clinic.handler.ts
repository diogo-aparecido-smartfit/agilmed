import { ConversationState } from "../services/chatbot.service";

export const requestClinicHandler = (session: ConversationState) => {
  session.message = "Qual clínica você deseja agendar?";
  session.options = ["Clínica A", "Clínica B", "Clínica C"];
  return session;
};
