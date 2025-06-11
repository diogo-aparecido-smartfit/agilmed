import { Redis } from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisConfig = {
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  password: process.env.REDIS_PASSWORD,
  tls: process.env.REDIS_TLS === "true" ? {} : undefined,
};

export const redisClient = new Redis(redisConfig);

redisClient.on("connect", () => {
  console.log("🟢 Redis connected successfully");
});

redisClient.on("error", (err) => {
  console.error("🔴 Redis connection error:", err);
});

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
  );
  console.log(`✅ Contexto salvo para usuário ${userId}`);
}

export async function getConversationContext(userId: string): Promise<any> {
  const data = await redisClient.get(`chat:context:${userId}`);
  return data ? JSON.parse(data) : null;
}

export async function clearConversationContext(userId: string): Promise<void> {
  await redisClient.del(`chat:context:${userId}`);
}

export async function addMessageToHistory(
  userId: number,
  message: any
): Promise<void> {
  const key = `chat:history:${userId}`;
  await redisClient.rpush(key, JSON.stringify(message));

  await redisClient.ltrim(key, 0, 49);
  await redisClient.expire(key, 300);
}

export async function getMessageHistory(userId: number): Promise<any[]> {
  console.log(`🔵 Pegando mensagens ${userId}:`);
  const items = await redisClient.lrange(`chat:history:${userId}`, 0, -1);
  console.log("Mensagens pegas: ", items?.length);

  // Sort messages in chronological order (oldest first)
  const messages = items.map((item) => JSON.parse(item));
  return messages;
}

export async function clearMessageHistory(userId: number): Promise<void> {
  await redisClient.del(`chat:history:${userId}`);
}
