import axios from "axios";
import { SYSTEM_PROMPT } from "../utils";

export class ChatService {
  async completions({
    history,
    userMessage,
  }: {
    history?: any[];
    userMessage: string;
  }) {
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

    const safeHistory = Array.isArray(history) ? history : [];

    const body = {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...safeHistory,
        { role: "user", content: userMessage },
      ],
    };

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        },
      }
    );
    return response.data;
  }
}
