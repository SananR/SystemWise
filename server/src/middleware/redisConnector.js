import { createClient } from 'redis';
import 'dotenv/config';

export const connectRedis = async () => {
  let redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  }).on('error', (err) => console.log('Redis Client Error', err));
  try {
    await redisClient.connect();
    console.log('Redis connected...');
    return redisClient;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
