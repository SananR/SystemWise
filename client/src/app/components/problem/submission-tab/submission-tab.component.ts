import { Component, OnInit, ViewChild } from "@angular/core";
import { SubmissionListComponent } from "../../submission/submission-list/submission-list.component";
import { NgIf } from "@angular/common";
import { RecentSubmissionComponent } from "../../submission/recent-submission/recent-submission.component";
import { SubmissionsService } from "../../../services/submissions.service";
import { ProblemService } from "../../../services/problem.service";

@Component({
  selector: "app-submission-tab",
  standalone: true,
  imports: [SubmissionListComponent, RecentSubmissionComponent, NgIf],
  templateUrl: "./submission-tab.component.html",
  styleUrl: "./submission-tab.component.scss",
})
export class SubmissionTabComponent implements OnInit {
  currentSubmissionId: string | undefined = undefined;

  constructor(
    public submissionsService: SubmissionsService,
    private problemsService: ProblemService
  ) {}

  @ViewChild("recentSubmission") recentSubmission:
    | RecentSubmissionComponent
    | undefined;

  @ViewChild("submissionList") submissionList:
    | SubmissionListComponent
    | undefined;

  ngOnInit(): void {
    this.problemsService.currentSubmissionId.subscribe((submissionId) => {
      if (submissionId) this.openSubmission(submissionId);
    });
  }

  openSubmission(submissionId: string) {
    this.currentSubmissionId = submissionId;
    if (this.currentSubmissionId) {
      this.submissionsService
        .getSubmission(this.currentSubmissionId)
        .subscribe({
          next: (value) => {
            this.recentSubmission?.setSubmissionData(
              value.feedback,
              value.score
            );
          },
          error(err) {
            console.log(err);
          },
        });
    }
  }

  closeSubmission() {
    this.currentSubmissionId = undefined;
  }
}
