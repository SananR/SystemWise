import { Injectable } from '@angular/core';
import { ApiService } from "../services/api.service";
import APIResponse from '../util/api-response';

@Injectable({
  providedIn: 'root'
})
export class SubmissionRepositoryService {

  constructor(private api: ApiService) { }

  checkSubmissionGraded(submissionId: string) {
    return this.api.post<APIResponse>(`/api/submissions/check?=submission_id=${submissionId}`, {});
  }
}
