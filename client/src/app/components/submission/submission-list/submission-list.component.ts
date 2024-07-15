import { Component, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RecentSubmissionComponent } from "../recent-submission/recent-submission.component";

@Component({
  selector: "app-submission-list",
  standalone: true,
  imports: [CommonModule, RecentSubmissionComponent],
  templateUrl: "./submission-list.component.html",
  styleUrl: "./submission-list.component.scss",
})
export class SubmissionListComponent {
  submissions: any[] = [
    {
      timeSubmitted: "07/13/2024 18:19",
      score: "7",
      submission: "This is submission 0",
      feedback: "This is feedback 0",
    },
    {
      timeSubmitted: "07/13/2024 17:14",
      score: "3",
      submission: "This is submission 0",
      feedback: "This is feedback 0",
    },
    {
      timeSubmitted: "07/13/2024 17:14",
      score: "4",
      submission: "This is submission 0",
      feedback: "This is feedback 0",
    },
    {
      timeSubmitted: "07/13/2024 17:12",
      score: "7",
      submission: "This is submission 0",
      feedback: "This is feedback 0",
    },
    {
      timeSubmitted: "07/13/2024 17:12",
      score: "7",
      submission: "This is submission 0",
      feedback: "This is feedback 0",
    },
    {
      timeSubmitted: "06/05/2024 22:39",
      score: "7",
      submission: "This is submission 0",
      feedback: "This is feedback 0",
    },
    {
      timeSubmitted: "05/01/2024 08:59",
      score: "7",
      submission: "This is submission 0",
      feedback: "This is feedback 0",
    },
    {
      timeSubmitted: "11/07/2023 17:40",
      score: "7",
      submission: "This is submission 0",
      feedback: "This is feedback 0",
    },
  ];

  currSubmission: any | null = null;

  constructor() {}

  ngOnInit(): void {}

  submissionClickHandler(submission: any) {
    this.currSubmission = submission;
  }

  handleBackArrowClick() {
    this.currSubmission = null;
  }
}
