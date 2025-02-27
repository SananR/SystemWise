![alt text](/doc/logo.png)

## Team Name

### algoats

## Team members

Hammad Iqbal - hammad.iqbal@mail.utoronto.ca <br/>
Yu Yang (Kenny) Chen - kennyyuyang.chen@mail.utoronto.ca <br/>
Sanan Rao - sanan.rao@mail.utoronto.ca

## Brief description of the web application

SystemWise is a specialized web application designed to help aspiring and experienced infrastructure engineers and architects sharpen their skills. Similar to LeetCode, SystemWise offers a vast collection of problems focused on software architecture and design, including but not limited to popular topics such as software scalability, reliability, microservices, etc. However, what separates our system with competitors, is that the users get instantaneous feedback, and hints, in the form of a chat bot powered by AI, similar to a technical interview. SystemWise aims to bridge the disconnect between pure theoretical knowledge and practical interview expertise.

## Required Elements

- We will be using Angular as the front-end framework
- We will use Express to manage our back-end API
- We will use MongoDB as the primary database
- We will integrate with Mermaid in order to provide a diagram editor
- We will integrate with Mailersend in order to send user's emails
- We will integrate LangChain API, and by proxy, OpenAI, Llama, Hugging Face, etc, to power instantaneous feedback when attempting problems.
- We will use GCP to host our remote servers.
- Users will be able to log in to their own accounts on OAuth 2.0 to track their progress.

## Additional Requirements

- We will use webhooks to integrate with Mailersend
- We will use websockets to faciliate an event driven architecture in order to communicate data between the front-end and back-end, regarding submission grading and communication with a chatbot.
- The backend will need to utilize LangChain API in order to use LLMs such as GPT to power the submission grading, analysis and provide the user feedback. This is a long running task and will likely require a task queue.

## Alpha Version Milestones

- Front Page
- User Auth
- Researching how to approach submission grading and the system design problems

## Beta Version Milestones

- Simple system design problems
- Submission Grading

## Final Version Milestones

- Chat bot communication
- More problems
- Leaderboards (Time permitting)
