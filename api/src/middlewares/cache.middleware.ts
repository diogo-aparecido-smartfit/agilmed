import { Request, Response, NextFunction } from "express";
import { redisClient } from "../config/redis";

interface CacheOptions {
  expire?: number;
  customKey?: (req: Request) => string;
}

export const cacheMiddleware = (options: CacheOptions = {}) => {
  const TTL = options.expire || 3600;

  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== "GET") {
      next();
      return;
    }

    const cacheKey = options.customKey
      ? options.customKey(req)
      : `cache:${req.originalUrl}`;

    try {
      const cachedData = await redisClient.get(cacheKey);

      if (cachedData) {
        console.log(`🔵 Cache hit para: ${cacheKey}`);
        res.json(JSON.parse(cachedData));
        return;
      }

      const originalJson = res.json;
      res.json = function (body) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          redisClient.set(cacheKey, JSON.stringify(body), "EX", TTL);
          console.log(`🔵 Armazenado em cache: ${cacheKey}`);
        }

        return originalJson.call(this, body);
      };

      next();
    } catch (error) {
      console.error(`🔴 Erro ao acessar cache: ${error}`);
      next();
    }
  };
};

export const invalidateCache = async (pattern: string): Promise<void> => {
  try {
    const keys = await redisClient.keys(`cache:${pattern}`);
    if (keys.length > 0) {
      await Promise.all(keys.map((key) => redisClient.del(key)));
      console.log(`🔵 Cache invalidado para padrão: ${pattern}`);
    }
  } catch (error) {
    console.error(`🔴 Erro ao invalidar cache: ${error}`);
  }
};
