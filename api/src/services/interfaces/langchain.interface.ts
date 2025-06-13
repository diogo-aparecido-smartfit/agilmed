import { MessageContent } from "@langchain/core/messages";

export interface ILangChainService {
  processMessage(
    userId: number,
    message: string,
    history?: any[],
    userName?: string
  ): Promise<{
    role: string;
    content: MessageContent;
  }>;
}
