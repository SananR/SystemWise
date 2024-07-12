import { Job, Worker } from "bullmq";
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { Redis } from "ioredis";

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

// const chatModel = new ChatOpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

async function gradeSubmission(submission) {
  console.log("grading submission!");
  //const res = await chatModel.invoke("What is LangChain?");
  //console.log(res);
}

// const jobsHandlers = {
//   SubmissionGrader: gradeSubmission,
// };

const gradingWorker = new Worker(
  "SubmissionQueue",
  async (job) => {
    console.log(job);
    return "YAY IT WORKS";
  },
  { connection: redisClient }
);

gradingWorker.on("ready", function () {
  console.log("Worker is started and ready...");
});

//gradeSubmission("geelo");
