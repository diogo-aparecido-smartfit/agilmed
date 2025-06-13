export interface IToolService {
  executeTool(toolName: string, args: any): Promise<any>;
}
