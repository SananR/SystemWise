import { Injectable } from '@angular/core';
import { Observable, timer, Subject, switchMap, takeUntil } from 'rxjs';
import { SubmissionRepositoryService } from '../repositories/submission-repository.service';

@Injectable({
  providedIn: 'root'
})
const POLL_INTERVAL = 5000;  // <-- poll every 5 seconds

export class SubmissionsService {

  closeTimer$ = new Subject<any>();

  constructor(private submissionRepository: SubmissionRepositoryService) { }

  async checkSubmission(submissionId: string) {
    return timer(0, POLL_INTERVAL).pipe(
      switchMap(() => this.submissionRepository.checkSubmissionGraded(submissionId)), 
      takeUntil(this.closeTimer$)  
    ).subscribe({
      next: (res: any) => {
        if (res.status == "GRADED") {
          this.closeTimer$.next(1); 
          return res;
        }
      },
      error: (error: any) => {
        console.log(error);
        return { error: error }; 
      }
    });
  }

}
