import { Redis } from 'ioredis';
import 'dotenv/config';

export let redisClient;

export const connectRedis = async () => {
  try {
    redisClient = new Redis(
      Number(process.env.REDIS_PORT),
      process.env.REDIS_HOST || ''
    )
      .on('error', function (e) {
        console.log('Redis Client Error', e);
        process.exit(1);
      })
      .on('connect', function (e) {
        console.log('Redis connected...');
      });
    return redisClient;
  } catch (error) {
    console.log('Redis Client Error', error);
    process.exit(1);
  }
};
