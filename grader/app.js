import { Job, Worker } from "bullmq";
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";

const chatModel = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function gradeSubmission(submission) {
  console.log("grading submission!");
  const res = await chatModel.invoke("What is LangChain?");
  console.log(res);
}

// const jobsHandlers = {
//   SubmissionGrader: gradeSubmission,
// };

// const gradingWorker = new Worker("submissions", async (job) => {
//   gradeSubmission(null);
// });

gradeSubmission("geelo");
