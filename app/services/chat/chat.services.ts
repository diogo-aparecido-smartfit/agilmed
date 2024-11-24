import { Post, Get } from "../api/chat.methods";

export async function createMessage(
  conversationId: string,
  text: string,
  chatbotUserId: string
) {
  const body = {
    payload: {
      text,
      type: "text",
    },
    conversationId,
  };

  return await Post("/messages", body, {
    "x-user-key": chatbotUserId,
  });
}

export async function listMessages(
  conversationId: string,
  chatbotUserId: string
) {
  return await Get(`/conversations/${conversationId}/messages`, {
    "x-user-key": chatbotUserId,
  });
}
