import { Component } from "@angular/core";
import { MarkdownComponent } from "ngx-markdown";

@Component({
  selector: "app-recent-submission",
  standalone: true,
  imports: [MarkdownComponent],
  templateUrl: "./recent-submission.component.html",
  styleUrl: "./recent-submission.component.scss",
})
export class RecentSubmissionComponent {
  recentSubmission: string =
    "### Grading:\n" +
    "\n" +
    "#### Functional Requirements:\n" +
    "1. User can access the original URL using the shortened URL.\n" +
    "2. The shortened URL should be minimal in length.\n" +
    "3. Users can create custom URLs with a maximum character limit of 16.\n" +
    "4. Service should collect metrics like the most clicked links.\n" +
    "5. Once a shortened link is generated, it stays in the system for a lifetime.\n" +
    "\n" +
    "**Score: 9/10** - Most requirements are covered, but the requirement for exposing REST APIs for integration with third-party applications isn't mentioned explicitly.\n" +
    "\n" +
    "#### Non-functional Requirements:\n" +
    "- Supports large volumes.\n" +
    "- Fault tolerance and availability.\n" +
    "- Latency.\n" +
    "\n" +
    "**Score: 9/10** - The non-functional requirements are broadly covered but not detailed in terms of specific latency or availability SLAs.\n" +
    "\n" +
    "#### Scalability Estimates:\n" +
    "- The capacity estimation is incorrect. There are not 70 billion people in the world.\n" +
    "- Corrected TPS (Transactions Per Second) estimation involves approximately 700 million requests per day.\n" +
    "\n" +
    "**Score: 4/10** - Correct conceptual understanding but flawed in calculation.\n" +
    "\n" +
    "#### API Design:\n" +
    "- GET shortenUrl/read/shortenurl\n" +
    "- PUT shortenUrl/write/shortenurl/originalUrl\n" +
    "\n" +
    "**Score: 8/10** - Basic API design is good but lacks RESTful conventions and endpoint for analytics.\n" +
    "\n" +
    "#### Database Design:\n" +
    "- Primary Key: shortenUrl\n" +
    "- Value: originalUrl\n" +
    "\n" +
    "**Score: 6/10** - Basic structure is correct, but the schema lacks details like user association, timestamps, and analytics.\n" +
    "\n" +
    "#### Components and Data Flow:\n" +
    "- Read Flow:\n" +
    "   1. Request to API Gateway.\n" +
    "   2. Rate limiting.\n" +
    "   3. Load balancer.\n" +
    "   4. Data access layer reads from cache or replica database.\n" +
    "\n" +
    "- Write Flow:\n" +
    "   1. Request to API Gateway.\n" +
    "   2. Rate limiting.\n" +
    "   3. Load balancer.\n" +
    "   4. Data access layer writes to the main database.\n" +
    "\n" +
    "**Score: 8/10** - Correct but the role of each component can be elaborated more.\n" +
    "\n" +
    "#### Component Design & Scalability:\n" +
    "- Using NoSQL for scalability.\n" +
    "- Cache read misses.\n" +
    "- Replica database for reading.\n" +
    "\n" +
    "**Score: 7/10** - Good usage of NoSQL and cache but lacks specifics on failure handling and scalability tests.\n" +
    "\n" +
    "#### Trade-offs/Tech Choices:\n" +
    "- NoSQL DB for simple schema and response time priority.\n" +
    "  \n" +
    "**Score: 7/10** - Correct tech choices but not deeply discussed trade-offs.\n" +
    "\n" +
    "#### Failure Scenarios/Bottlenecks:\n" +
    "- Cache miss and stale data.\n" +
    "- Failures in read replicas synchronization.\n" +
    "\n" +
    "**Score: 7/10** - Good discussion on potential failures, but resolution strategies can be detailed further.\n" +
    "\n" +
    "#### Diagrams:\n" +
    "- ER Diagram provided.\n" +
    "\n" +
    "```mermaid\n" +
    "erDiagram\n" +
    "    ShortenUrl ||--|| OrginalUrl : has \n" +
    "    OrginalUrl {\n" +
    '        string url "Primary Key"\n' +
    "    }\n" +
    "```\n" +
    "\n" +
    "**Score: 6/10** - Simple diagram, needs to include more entities and relationships (e.g. URL hits, metadata).\n" +
    "\n" +
    "### Overall Score: 7.1/10\n" +
    "\n" +
    "**Feedback:**\n" +
    "Your design submission covers most of the system requirements well, especially the functional and high-level architectural design. However, there are areas for improvement:\n" +
    "1. Correct the capacity estimation and redo calculations realistically.\n" +
    "2. The database schema needs to encompass analytics and metadata.\n" +
    "3. Include detailed endpoint designs for REST APIs and analytics.\n" +
    "4. Elaborate more on component scalability, specifics for failure rectification, and latency handling.\n" +
    "5. Create more comprehensive diagrams. \n" +
    "\n" +
    "Overall, a solid effort, but focusing on these details will improve the system design substantially.";
}
