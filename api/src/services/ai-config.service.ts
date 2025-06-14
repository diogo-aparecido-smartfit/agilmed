import { ChatOpenAI } from "@langchain/openai";
import { IAIConfigService } from "./interfaces/ai-config.interface";

export class AIConfigService implements IAIConfigService {
  public createModel(): ChatOpenAI {
    return new ChatOpenAI({
      modelName: process.env.OPENROUTER_MODEL || "openai/gpt-4o",
      temperature: 0.2,
      configuration: {
        baseURL: "https://openrouter.ai/api/v1",
        defaultHeaders: {
          "HTTP-Referer": "https://agilmed-api.azurewebsites.net",
          "X-Title": "AgilMed Assistant",
        },
      },
      openAIApiKey: process.env.FIRST_OPENROUTER_API_KEY || "",
    });
  }

  public getTools() {
    return [
      {
        type: "function",
        function: {
          name: "list_doctors",
          description:
            "Lista todos os médicos disponíveis ou filtra por especialidade.",
          parameters: {
            type: "object",
            properties: {
              specialty: {
                type: "string",
                description: "Especialidade médica para filtrar (opcional)",
              },
            },
            required: [],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "find_nearby_places",
          description:
            "Encontra estabelecimentos de saúde próximos à localização do usuário.",
          parameters: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description:
                  "Tipo de estabelecimento (hospital, farmácia, clínica, etc.)",
              },
              lat: {
                type: "number",
                description:
                  "Latitude (opcional, se não fornecida use valores padrão)",
              },
              lon: {
                type: "number",
                description:
                  "Longitude (opcional, se não fornecida use valores padrão)",
              },
            },
            required: ["query"],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "create_appointment",
          description: "Cria um novo agendamento médico.",
          parameters: {
            type: "object",
            properties: {
              doctor_id: {
                type: "number",
                description: "ID do médico",
              },
              patient_id: {
                type: "number",
                description: "ID do paciente",
              },
              appointment_date: {
                type: "string",
                description: "Data e hora da consulta (formato ISO)",
              },
              reason: {
                type: "string",
                description: "Motivo da consulta",
              },
            },
            required: ["doctor_id", "patient_id", "appointment_date", "reason"],
          },
        },
      },
    ];
  }
}
