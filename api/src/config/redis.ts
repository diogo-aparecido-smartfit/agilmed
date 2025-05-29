import { Redis } from "ioredis";
import dotenv from "dotenv";

dotenv.config();

// Configuração do Redis com base nas variáveis de ambiente
const redisConfig = {
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  password: process.env.REDIS_PASSWORD,
  tls: process.env.REDIS_TLS === "true" ? {} : undefined,
};

// Cliente do Redis
export const redisClient = new Redis(redisConfig);

// Testar conexão
redisClient.on("connect", () => {
  console.log("🟢 Redis connected successfully");
});

redisClient.on("error", (err) => {
  console.error("🔴 Redis connection error:", err);
});

// Função para armazenar o contexto da conversa
export async function storeConversationContext(
  userId: string,
  data: any
): Promise<void> {
  console.log(
    `🔵 Salvando contexto para usuário ${userId}:`,
    JSON.stringify(data).substring(0, 100) + "..."
  );
  await redisClient.set(
    `chat:context:${userId}`,
    JSON.stringify(data),
    "EX",
    60 * 60 * 24
  ); // Expira em 24h
  console.log(`✅ Contexto salvo para usuário ${userId}`);
}
// Função para recuperar o contexto da conversa
export async function getConversationContext(userId: string): Promise<any> {
  const data = await redisClient.get(`chat:context:${userId}`);
  return data ? JSON.parse(data) : null;
}

// Função para limpar o contexto da conversa
export async function clearConversationContext(userId: string): Promise<void> {
  await redisClient.del(`chat:context:${userId}`);
}
