import { Job, Worker } from "bullmq";
import "dotenv/config";
import { Redis } from "ioredis";
import { gradeSubmission } from "./grader.ts";
import { SubmissionJobType, Submission } from "../server/src/models/submission.ts";
import mongoose from "mongoose";
import { SubmissionStatus } from "./models/submission.ts";

let redisClient: Redis;

/*
  Establish redis connection
*/
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

/*
  Establish MongoDB connection
*/
try {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.reshd9v.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority&appName=Cluster0`,
    {}
  );
  console.log('MongoDB connected...');
} catch (err) {
  console.error(err.message);
  process.exit(1);
}

const exampleInput =
  "Functional: List functional requirements for the system (Ask the chat bot for hints if stuck.)... 1.User is able to access a web site using the shorten url. Eg: www.g4e.com is same as www.google.com Non-Functional: support large volumes fault tolerance and availability latency Capacity estimation There are 70 billion people in the world. Each person access the url 5 times per day. that's 70 * 10^ 10 * 5 / 24/60/60 = 4 * 10^7 TPS It's a heavy read system while very low rate of write. API design GET shortenUrl/read/shortenurl PUT shortenUrl/write/shortenurl/originalUrl Database design Primary key: shortenUrl Value: originalUrl erDiagram ShortenUrl ||--|| OrginalUrl : has OrginalUrl  string url \"Primary Key\"  For read flow: 1.The request goes to Api gateway. 2.check if the client has exceed the rate limit, if not, block the request. 3.The load balancer will choose the right server, algorithm can be round Robin. 4.Server will access database via Data access layer 5.Data access layer will read from the cache, if the cache miss, data access layer will read from replica database that copies the data from write database periodically For the write flow: 1.The request goes to Api gateway. 2.check if the client has exceed the rate limit, if not, block the request. 3.The load balancer will choose the right server, algorithm can be round Robin. 4.Server will write the main database via the data access layer. Detailed component design Dig deeper into 2-3 components and explain in detail how they work. For example, how well does each component scale? Any relevant algorithm or data structure you like to use for a component? Also you could draw a diagram using the diagramming tool to enhance your design... Trade offs/Tech choices We can use nosql db such as mongo db or dynamo because the db schema is simple Does not need strong consistency, response time matters Failure scenarios/bottlenecks Failure scenarios: There is a chance that the url accessed from cache is not the latest one. For example, there is an update for the shorten url but the cache and read database has not updated the latest one. Since this system does not need the strong consistency, we are ok with that. If there is a cache miss or url not correct, we can invalid cache and ask read database to copy from main database.";

const gradingWorker = new Worker(
  "SubmissionQueue",
  async (job: Job) => {
    switch (job.name) {
      case SubmissionJobType.GRADE_SUBMISSION:
    }
    const submissionTextContent = job.data.submission.content;
    // Grade submission
    const res = await gradeSubmission(submissionTextContent);
    const score: Number = +res.output;
    console.log(score);
    // Update submission
    const submission = await Submission.findOneAndUpdate(
      {_id: job.data.submission._id},
      {"$set": {status: SubmissionStatus.GRADED, score: score}},
      { upsert: true }
    );
    console.log(submission);
    return submission;
  },
  { connection: redisClient }
);

gradingWorker.on("ready", function () {
  console.log("Worker is started and ready...");
});
