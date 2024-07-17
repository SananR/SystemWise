import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RecentSubmissionComponent } from "../recent-submission/recent-submission.component";
import { SubmissionsService } from "../../../services/submissions.service";
import { ProblemService } from "../../../services/problem.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-submission-list",
  standalone: true,
  imports: [CommonModule, RecentSubmissionComponent, MatProgressSpinnerModule],
  templateUrl: "./submission-list.component.html",
  styleUrl: "./submission-list.component.scss",
})
export class SubmissionListComponent {
  submissions: any[] = [];

  constructor(
    private submissionService: SubmissionsService,
    private problemService: ProblemService
  ) {}

  ngOnInit(): void {
    this.submissionService.getUserSubmissions().subscribe({
      next: (value) => {
        this.submissions = value.submissions;
      },
      error(err) {
        if (err.status == 401) return;
        console.log(err);
        return err;
      },
    });
  }

  getDateFormat(date: string) {
    return (
      new Date(date).toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      }) +
      " at " +
      new Date(date).toLocaleTimeString("en-us")
    );
  }

  submissionClickHandler(submission: any) {
    this.problemService.setCurrentSubmission(submission._id);
  }
}
