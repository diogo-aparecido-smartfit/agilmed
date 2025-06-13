import { ChatOpenAI } from "@langchain/openai";

export interface IAIConfigService {
  createModel(): ChatOpenAI;
  getTools(): any[];
}
