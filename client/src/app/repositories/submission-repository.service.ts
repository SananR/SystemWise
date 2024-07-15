import { Injectable } from "@angular/core";
import { ApiService } from "../services/api.service";
import APIResponse from "../util/api-response";

@Injectable({
  providedIn: "root",
})
export class SubmissionRepositoryService {
  constructor(private api: ApiService) {}

  createSubmission(content: string) {
    //todo dynamic problem
    return this.api.post<any>("/api/submissions/?problem=TinyURL", {
      content: content,
    });
  }

  checkSubmissionGraded(submissionId: string) {
    return this.api.post<any>(
      `/api/submissions/check?submission_id=${submissionId}`,
      {}
    );
  }
}
