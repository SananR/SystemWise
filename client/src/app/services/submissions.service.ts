import { Injectable } from "@angular/core";
import {
  timer,
  Subject,
  switchMap,
  takeUntil,
  retry,
  share,
  BehaviorSubject,
} from "rxjs";
import { SubmissionRepositoryService } from "../repositories/submission-repository.service";

const POLL_INTERVAL = 5000; // <-- poll every 5 seconds

@Injectable({
  providedIn: "root",
})
export class SubmissionsService {
  closeTimer = new Subject<any>();
  submissionResult = new Subject<any>();
  recentSubmissionId = new Subject<string>();
  userTextContent = new BehaviorSubject<string>("");

  constructor(private submissionRepository: SubmissionRepositoryService) {}

  closeCheckTimer() {
    this.closeTimer.next(1);
  }

  createSubmission(content: string) {
    this.closeTimer.next(0);
    this.submissionResult = new Subject<any>();
    return this.submissionRepository.createSubmission(content).subscribe({
      next: (value) => {
        if (value.error) return value.error;
        this.recentSubmissionId.next(value.submission_id);
        this.checkSubmission(value.submission_id);
      },
      error(err) {
        console.log(err);
        return err;
      },
    });
  }

  checkSubmission(submissionId: string) {
    return timer(0, POLL_INTERVAL)
      .pipe(
        switchMap(() =>
          this.submissionRepository.checkSubmissionGraded(submissionId)
        ),
        takeUntil(this.closeTimer),
        retry(),
        share()
      )
      .subscribe({
        next: (res: any) => {
          if (res.submission_status == "GRADED") {
            this.closeCheckTimer();
            this.submissionResult.next(res);
          }
        },
        error: (error: any) => {
          console.log(error);
          return { error: error };
        },
      });
  }
}
