import { Injectable } from "@angular/core";
import {
  Observable,
  timer,
  Subject,
  switchMap,
  takeUntil,
  tap,
  retry,
  share,
} from "rxjs";
import { SubmissionRepositoryService } from "../repositories/submission-repository.service";

const POLL_INTERVAL = 5000; // <-- poll every 5 seconds

@Injectable({
  providedIn: "root",
})
export class SubmissionsService {
  closeTimer = new Subject<any>();
  submissionResult = new Subject<any>();

  constructor(private submissionRepository: SubmissionRepositoryService) {}

  closeCheckTimer() {
    this.closeTimer.next(1);
  }

  checkSubmission(submissionId: string) {
    this.submissionResult = new Subject<any>();
    this.closeTimer.next(0);
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
