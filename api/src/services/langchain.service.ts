import { ChatOpenAI } from "@langchain/openai";
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { ToolService } from "./tool.service";
import { AIConfigService } from "./ai-config.service";
import { TOOL_SYSTEM_PROMPT } from "../utils/bot.prompt";
import { ILangChainService } from "./interfaces/langchain.interface";

export class LangChainService implements ILangChainService {
  private model: ChatOpenAI;

  constructor(
    private toolService: ToolService,
    private aiConfigServer: AIConfigService
  ) {
    this.model = this.aiConfigServer.createModel();
  }

  public async processMessage(
    userId: number,
    message: string,
    history: any[] = [],
    userName?: string
  ) {
    try {
      const modelWithTools = this.model.withConfig({
        tools: this.aiConfigServer.getTools(),
        tool_choice: "auto",
      });

      const formattedHistory = this.formatChatHistory(history);

      let systemPrompt = TOOL_SYSTEM_PROMPT;
      if (userName) {
        systemPrompt += `\n\n# INFORMAÇÕES DO USUÁRIO:\nNome do usuário: ${userName}\n\nLembre-se de sempre se dirigir ao usuário pelo nome quando responder.`;
      }

      const systemMessage = new SystemMessage(systemPrompt);

      const response = await modelWithTools.invoke([
        systemMessage,
        ...formattedHistory,
        new HumanMessage(message),
      ]);

      if (response.tool_calls && response.tool_calls.length > 0) {
        return await this.handleToolCalls(
          response,
          systemMessage,
          formattedHistory,
          message
        );
      }

      return {
        role: "assistant",
        content: response.content,
      };
    } catch (error) {
      console.error("Erro ao processar mensagem:", error);
      return {
        role: "assistant",
        content:
          "Desculpe, tive um problema ao processar sua solicitação. Poderia tentar novamente?",
      };
    }
  }

  private formatChatHistory(history: any[]) {
    return history.map((msg) => {
      return msg.role === "user"
        ? new HumanMessage(msg.content)
        : new AIMessage(msg.content);
    });
  }

  private async handleToolCalls(
    response: any,
    systemMessage: SystemMessage,
    formattedHistory: any[],
    userMessage: string
  ) {
    try {
      console.log("Modelo quer usar ferramentas:", response.tool_calls);

      const toolResults = await Promise.all(
        response.tool_calls.map(async (toolCall: any) => {
          const toolName = toolCall.name;
          const args = toolCall.args;

          const result = await this.toolService.executeTool(toolName, args);

          return {
            tool_call_id: toolCall.id,
            role: "tool",
            name: toolName,
            content: JSON.stringify(result),
          };
        })
      );

      const secondResponse = await this.model.invoke([
        systemMessage,
        ...formattedHistory,
        new HumanMessage(userMessage),
        response,
        ...toolResults,
      ]);

      return {
        role: "assistant",
        content: secondResponse.content,
      };
    } catch (error) {
      console.error("Erro ao processar chamadas de ferramentas:", error);
      throw error;
    }
  }
}
