import { createClient } from 'redis';

export const connectRedis = async () => {
  let redisClient = createClient().on('error', (err) =>
    console.log('Redis Client Error', err)
  );
  try {
    await redisClient.connect();
    console.log('Redis connected...');
    return redisClient;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
