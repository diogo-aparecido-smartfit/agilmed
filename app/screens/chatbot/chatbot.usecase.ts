// import { useChatbot } from "@/hooks/chatbot/useChatBot";

export function useChatbotUseCase(userId: string) {
  // const { chatState, sendMessage } = useChatbot(userId);

  const handleSendMessage = (message: string) => {
    // sendMessage(message);
    console.log(message);
  };
  const chatState = [""];

  return {
    chatState,
    handleSendMessage,
  };
}
