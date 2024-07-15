import { Injectable } from "@angular/core";
import { RichTextEditor } from "@syncfusion/ej2-angular-richtexteditor";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProblemService {
  private textEditor = new BehaviorSubject<RichTextEditor | undefined>(
    undefined
  );

  constructor() {}

  initializeTextEditor(textEditor: any) {
    this.textEditor.next(textEditor);
  }

  getTextContent(): string {
    if (!this.textEditor.getValue()) return "";
    else return this.textEditor!.getValue()!.value;
  }
}
