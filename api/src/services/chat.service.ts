import axios from "axios";
import { SYSTEM_PROMPT } from "../utils/bot.prompt";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export class ChatService {
  async completions({
    history,
    userMessage,
  }: {
    history?: any[];
    userMessage: string;
  }) {
    const safeHistory = Array.isArray(history) ? history : [];

    const body = {
      model: "meta-llama/llama-3.3-8b-instruct:free",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...safeHistory,
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
      const response = await tryWithKey(firstKey!);
      return response.data;
    } catch (error: any) {
      const code =
        error?.response?.data?.error?.code || error?.response?.status;
      if (code === 429 && secondKey) {
        try {
          const response = await tryWithKey(secondKey);
          return response.data;
        } catch (err) {
          throw err;
        }
      }
      throw error;
    }
  }
}
