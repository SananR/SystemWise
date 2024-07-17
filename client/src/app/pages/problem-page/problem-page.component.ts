import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { TextEditorComponent } from "../../components/problem/text-editor/text-editor.component";
import { ProblemToolbarComponent } from "../../components/toolbar/problem-page/problem-toolbar.component";
import { TabbedContainerComponent } from "../../components/tabbed-container/tabbed-container.component";
import { TabbedContainerItemComponent } from "../../components/tabbed-container/tabbed-container-item/tabbed-container-item.component";
import { SubmissionTabComponent } from "../../components/problem/submission-tab/submission-tab.component";
import {
  faPenToSquare,
  faClockRotateLeft,
  faDiagramProject,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { RecentSubmissionComponent } from "../../components/submission/recent-submission/recent-submission.component";
import { SubmissionListComponent } from "../../components/submission/submission-list/submission-list.component";
import { ProblemDescriptionComponent } from "../../components/problem/problem-description/problem-description.component";
import { FlowchartEditorComponent } from "../../components/diagram/flowchart-editor/flowchart-editor.component";
import { ProblemService } from "../../services/problem.service";

@Component({
  selector: "app-problem-page",
  standalone: true,
  imports: [
    TextEditorComponent,
    ProblemToolbarComponent,
    TabbedContainerComponent,
    TabbedContainerItemComponent,
    RecentSubmissionComponent,
    SubmissionListComponent,
    ProblemDescriptionComponent,
    FlowchartEditorComponent,
    SubmissionTabComponent,
  ],
  templateUrl: "./problem-page.component.html",
  styleUrl: "./problem-page.component.scss",
})
export class ProblemPageComponent implements AfterViewInit {
  faPenToSquare: IconDefinition = faPenToSquare;
  faClockRotateLeft: IconDefinition = faClockRotateLeft;
  faDiagramProject: IconDefinition = faDiagramProject;

  @ViewChild("leftContainer") leftContainer:
    | TabbedContainerComponent
    | undefined;

  constructor(private problemService: ProblemService) {}

  ngAfterViewInit(): void {
    this.problemService.currentSubmissionId.subscribe((submissionId) => {
      // Switch to submissions tab when a submission is selected
      if (submissionId) {
        this.leftContainer?.updateActiveTabNumber(1);
      }
    });
  }
}
