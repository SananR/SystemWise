import { Injectable, OnDestroy } from "@angular/core";
import { RichTextEditor } from "@syncfusion/ej2-angular-richtexteditor";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProblemService implements OnDestroy {
  private textEditor = new BehaviorSubject<RichTextEditor | undefined>(
    undefined
  );

  currentSubmissionId = new BehaviorSubject<string | undefined>(undefined);

  constructor() {}

  ngOnDestroy(): void {
    this.textEditor.unsubscribe();
  }

  setCurrentSubmission(submissionId: string | undefined) {
    this.currentSubmissionId.next(submissionId);
  }

  initializeTextEditor(textEditor: any) {
    this.textEditor.next(textEditor);
  }

  getTextContent(): string {
    if (!this.textEditor.getValue()) return "";
    else return this.textEditor!.getValue()!.value;
  }
}
