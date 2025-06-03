import { redisClient } from "../config/redis";

export const setupCacheCleaner = () => {
  setInterval(async () => {
    try {
      console.log("🧹 Iniciando limpeza de cache");

      const keys = await redisClient.keys("cache:*");

      console.log(`🔍 Encontrados ${keys.length} itens em cache`);

      if (keys.length === 0) return;

      console.log("✅ Limpeza de cache concluída");
    } catch (error) {
      console.error("🔴 Erro na limpeza de cache:", error);
    }
  }, 86400000);
};
