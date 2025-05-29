import axios from "axios";
import { SYSTEM_PROMPT } from "../utils/bot.prompt";
import { getMessageHistory, addMessageToHistory } from "../config/redis";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export class ChatService {
  async completions({
    userId,
    userMessage,
  }: {
    userId: number;
    userMessage: string;
  }) {
    const history = await getMessageHistory(userId);

    const body = {
      model: "meta-llama/llama-3.3-8b-instruct:free",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...history,
        { role: "user", content: userMessage },
      ],
    };

    const tryWithKey = async (apiKey: string) => {
      return axios.post(OPENROUTER_API_URL, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });
    };

    const firstKey = process.env.FIRST_OPENROUTER_API_KEY;
    const secondKey = process.env.SECOND_OPENROUTER_API_KEY;

    try {
      await addMessageToHistory(userId, { role: "user", content: userMessage });

      const response = await tryWithKey(firstKey!);

      const botMessage = response.data.choices?.[0]?.message;
      if (botMessage) {
        await addMessageToHistory(userId, botMessage);
      }

      return response.data;
    } catch (error: any) {
      const code =
        error?.response?.data?.error?.code || error?.response?.status;
      if (code === 429 && secondKey) {
        try {
          const response = await tryWithKey(secondKey);
          const botMessage = response.data.choices?.[0]?.message;
          if (botMessage) {
            await addMessageToHistory(userId, botMessage);
          }
          return response.data;
        } catch (err) {
          throw err;
        }
      }
      throw error;
    }
  }
}
