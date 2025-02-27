import { Component } from "@angular/core";
import { MarkdownComponent } from "ngx-markdown";
import {
  ProblemDifficultyTagComponent,
  ProblemDifficulty,
} from "../problem-difficulty-tag/problem-difficulty-tag.component";

@Component({
  selector: "app-problem-description",
  standalone: true,
  imports: [MarkdownComponent, ProblemDifficultyTagComponent],
  templateUrl: "./problem-description.component.html",
  styleUrl: "./problem-description.component.scss",
})
export class ProblemDescriptionComponent {
  //TODO dynamic
  problemDifficulty = ProblemDifficulty.EASY;

  problemTitle = "#### TinyURL";

  problemDescription =
    "\n#### Design a URL shortening service.\n" +
    "Given a URL, design a web API that generates a shorter and unique alias of it." +
    "\n\n" +
    "#### What is a TinyURL?" +
    "\n\n" +
    "TinyURL is a URL shortening service that creates a short URL alias of a long URL. When a user clicks on the tiny URL, they will get redirected to the original URL." +
    "\n\n" +
    "Tiny URLs are great to use in cases when there is a character/space limit. It is also easier and less error-prone for a user to enter a shorter URL." +
    "\n\n" +
    "#### Additional Requirements" +
    "\n\n" +
    "- ◦ Once a url created it will remain forever in system." +
    "\n\n" +
    "- ◦ Users can create a tiny URLs of his/her choice." +
    "\n\n" +
    "- ◦ Assume maximum character limit to be 16." +
    "\n\n" +
    "- ◦ Approximately 100 million new URLs will be shortened per month." +
    "\n\n" +
    "- ◦ Service should also aggregate metrics for targeted advertisements.";
}
