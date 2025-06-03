import { redisClient } from "../config/redis";

export const setupMessageHistoryCleaner = async () => {
  try {
    console.log("🧹 Iniciando limpeza do histórico de mensagens");

    const messageKeys = await redisClient.keys("chat:history:*");

    console.log(`🔍 Encontrados ${messageKeys.length} históricos de mensagens`);

    if (messageKeys.length > 0) {
      const deleteResult = await redisClient.del(...messageKeys);
      console.log(`🗑️ Deletados ${deleteResult} históricos de mensagens`);
    }

    const contextKeys = await redisClient.keys("chat:context:*");

    console.log(`🔍 Encontrados ${contextKeys.length} contextos de conversas`);

    if (contextKeys.length > 0) {
      const deleteResult = await redisClient.del(...contextKeys);
      console.log(`🗑️ Deletados ${deleteResult} contextos de conversas`);
    }

    console.log("✅ Limpeza de histórico de mensagens concluída");
  } catch (error) {
    console.error("🔴 Erro na limpeza de histórico de mensagens:", error);
  }
};
