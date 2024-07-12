import { Job, Worker } from "bullmq";
import { executeQuery } from "./grader.js";

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

executeQuery();
