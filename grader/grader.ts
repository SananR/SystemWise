import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { AgentExecutor, createToolCallingAgent } from "langchain/agents";
import { StackExchangeAPI } from "@langchain/community/tools/stackexchange";

const chatModel = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  model: "gpt-4o",
});

export async function gradeSubmission(input: string) {
  const designScenario =
    "This is the scenario for the interview: Design A URL shortener service like TinyURL creates a short url/aliases/tiny url against a long url. Moreover, when user click on the tiny url, he gets redirected to original url. Tiny url are exceedingly handy to share through sms/tweets (where there is limit to number of characters that can be messaged/tweeted) and also when they are printed in books/magazines etc.(Less character implies less printing cost). In addition, it is easy and less error prone to type a short url when compared to its longer version.";
  const commonQuestions =
    "These are answers to common questions that the interviewee may ask. If the interviewee asks things not covered, answer at your discretion. Assume once a url created it will remain forever in system. Yes user can create a tiny url of his/her choice. Assume maximum character limit to be 16. Assume 100 million new URL shortenings per month. Service should also aggregate metrics like number of URL redirections per day and other analytics for targeted advertisements.";
  const functionalRequirements =
    "These are the functional requirements for such a system: Service should be able to create shortened url/links against a long url. Click to the short URL should redirect the user to the original long URL. Shortened link should be as small as possible. Users can create custom url with maximum character limit of 16. Service should collect metrics like most clicked links. Once a shortened link is generated it should stay in system for lifetime.";
  const nonFunctionalRequirements =
    "These are non-functional requirements for the system: Service should be up and running all the time. URL redirection should be fast and should not degrade at any point of time (Even during peak loads). Service should expose REST API’s so that it can be integrated with third party applications.";
  const trafficEstimates =
    "These are some traffic estimates for the system: Number of unique shortened links generated per month = 100 million. Number of unique shortened links generated per second = 40. Assuming lifetime of service to be 100 years and with 100 million shortened links creation per month, total number of data points/objects in system will be = 100 million/month * 100 (years) * 12 (months) = 120 billion. Assuming size of each data object (Short url, long url, created date etc.) to be 500 bytes long, then total require storage = 120 billion * 500 bytes =60TB. Since we get 8000 read/redirection requests per second, we will be getting 700 million requests per day.";
  const endpoints =
    "These are some endpoints which are necessary to the system: an endpoint to create the shortened URL based on the long URL, and an endpoint to get the long URL based on the short URL.";
  const databaseSchemas =
    "These are related database schemas: User(User ID, name, email, createdat). URL(shortURL, longURL, userId).";
  const tools = [new StackExchangeAPI()];
  const exampleInput =
    "Functional: List functional requirements for the system (Ask the chat bot for hints if stuck.)... 1.User is able to access a web site using the shorten url. Eg: www.g4e.com is same as www.google.com Non-Functional: support large volumes fault tolerance and availability latency Capacity estimation There are 70 billion people in the world. Each person access the url 5 times per day. that's 70 * 10^ 10 * 5 / 24/60/60 = 4 * 10^7 TPS It's a heavy read system while very low rate of write. API design GET shortenUrl/read/shortenurl PUT shortenUrl/write/shortenurl/originalUrl Database design Primary key: shortenUrl Value: originalUrl erDiagram ShortenUrl ||--|| OrginalUrl : has OrginalUrl  string url \"Primary Key\"  For read flow: 1.The request goes to Api gateway. 2.check if the client has exceed the rate limit, if not, block the request. 3.The load balancer will choose the right server, algorithm can be round Robin. 4.Server will access database via Data access layer 5.Data access layer will read from the cache, if the cache miss, data access layer will read from replica database that copies the data from write database periodically For the write flow: 1.The request goes to Api gateway. 2.check if the client has exceed the rate limit, if not, block the request. 3.The load balancer will choose the right server, algorithm can be round Robin. 4.Server will write the main database via the data access layer. Detailed component design Dig deeper into 2-3 components and explain in detail how they work. For example, how well does each component scale? Any relevant algorithm or data structure you like to use for a component? Also you could draw a diagram using the diagramming tool to enhance your design... Trade offs/Tech choices We can use nosql db such as mongo db or dynamo because the db schema is simple Does not need strong consistency, response time matters Failure scenarios/bottlenecks Failure scenarios: There is a chance that the url accessed from cache is not the latest one. For example, there is an update for the shorten url but the cache and read database has not updated the latest one. Since this system does not need the strong consistency, we are ok with that. If there is a cache miss or url not correct, we can invalid cache and ask read database to copy from main database.";

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are a system design interviewer for SystemWise, and you are going to evaluate an interviewee's answers for a system design interview. Do not give them the answers. Simply grade them on a scale between 1-10, against our solutions, and some simple feedback on the logic and reasoning behind the submission. Furthermore, there will be Diagrams written in Mermaid that you will have to parse and evaluate.",
    ],
    ["system", designScenario],
    ["system", commonQuestions],
    ["system", functionalRequirements],
    ["system", nonFunctionalRequirements],
    ["system", trafficEstimates],
    ["system", endpoints],
    ["system", databaseSchemas],
    ["human", exampleInput],
    ["placeholder", "{agent_scratchpad}"],
  ]);

  const agent = await createToolCallingAgent({ llm: chatModel, tools, prompt });
  const agentExecutor = new AgentExecutor({ agent, tools });
  const response = await agentExecutor.invoke({
    input:
      "Please keep explanations somewhat ambiguous, so as to not give out the answers. Furthermore, do not be strict on the usage of Mermaid in the solution",
  });
  console.log(response);
}
