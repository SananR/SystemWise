import { Job, Worker } from "bullmq";
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { Redis } from "ioredis";
import { gradeSubmission } from "./grader.ts";

let redisClient: Redis;
/*
  Establish redis connection
*/
try {
  redisClient = new Redis(
    Number(process.env.REDIS_PORT),
    process.env.REDIS_HOST || "",
    { maxRetriesPerRequest: null }
  )
    .on("error", function (e) {
      console.log("Redis Client Error", e);
      process.exit(1);
    })
    .on("connect", function () {
      console.log("Redis connected...");
    });
} catch (error) {
  console.log("Redis Client Error", error);
  process.exit(1);
}

const jobsHandlers = {
  SubmissionGrader: gradeSubmission,
};

const gradingWorker = new Worker(
  "SubmissionQueue",
  async (job) => {
    console.log(job);
    const handler = gradeSubmission;
    return handler(job.data);
    return "YAY IT WORKS";
  },
  { connection: redisClient }
);

gradingWorker.on("ready", function () {
  console.log("Worker is started and ready...");
});

gradeSubmission("geelo");
