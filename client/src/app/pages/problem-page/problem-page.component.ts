import { Component } from "@angular/core";
import { TextEditorComponent } from "../../components/text-editor/text-editor.component";
import { ProblemToolbarComponent } from "../../components/toolbar/problem-page/problem-toolbar.component";
import { TabbedContainerComponent } from "../../components/tabbed-container/tabbed-container.component";
import { TabbedContainerItemComponent } from "../../components/tabbed-container/tabbed-container-item/tabbed-container-item.component";
import {
  faPenToSquare,
  faClockRotateLeft,
  faDiagramProject,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { RecentSubmissionComponent } from "../../components/submission/recent-submission/recent-submission.component";
import { SubmissionListComponent } from "../../components/submission/submission-list/submission-list.component";

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
  ],
  templateUrl: "./problem-page.component.html",
  styleUrl: "./problem-page.component.scss",
})
export class ProblemPageComponent {
  faPenToSquare: IconDefinition = faPenToSquare;
  faClockRotateLeft: IconDefinition = faClockRotateLeft;
  faDiagramProject: IconDefinition = faDiagramProject;
}
