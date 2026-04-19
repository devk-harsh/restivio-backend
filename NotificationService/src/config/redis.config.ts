import IORedis from "ioredis";
import { serverConfig } from "./index";

export const redisConnection = new IORedis({
  host: serverConfig.REDIS_HOST,
  port: serverConfig.REDIS_PORT,
  maxRetriesPerRequest: null,
});