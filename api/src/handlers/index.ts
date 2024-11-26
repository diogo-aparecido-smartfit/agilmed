import { greetingHandler } from "./greeting.handler";
import { askNameHandler } from "./ask-name.handler";
import { requestPharmacyHandler } from "./request-pharmacy.handler";
import { requestClinicHandler } from "./request-clinic.handler";
import { ConversationState } from "../services/chatbot.service";

type IntentType =
  | "greeting"
  | "ask_name"
  | "request_pharmacy"
  | "request_clinic";

export const handlerOptions: Record<
  IntentType,
  (session: ConversationState) => ConversationState
> = {
  greeting: greetingHandler,
  ask_name: askNameHandler,
  request_pharmacy: requestPharmacyHandler,
  request_clinic: requestClinicHandler,
};
