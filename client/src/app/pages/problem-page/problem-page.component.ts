import { Component } from "@angular/core";
import { TextEditorComponent } from "../../components/text-editor/text-editor.component";
import { ToolbarComponent } from "../../components/toolbar/toolbar.component";
import { TabbedContainerComponent } from "../../components/tabbed-container/tabbed-container.component";
import { TabbedContainerItemComponent } from "../../components/tabbed-container/tabbed-container-item/tabbed-container-item.component";
import {
  faPenToSquare,
  faClockRotateLeft,
  faDiagramProject,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-problem-page",
  standalone: true,
  imports: [
    TextEditorComponent,
    ToolbarComponent,
    TabbedContainerComponent,
    TabbedContainerItemComponent,
  ],
  templateUrl: "./problem-page.component.html",
  styleUrl: "./problem-page.component.scss",
})
export class ProblemPageComponent {
  faPenToSquare: IconDefinition = faPenToSquare;
  faClockRotateLeft: IconDefinition = faClockRotateLeft;
  faDiagramProject: IconDefinition = faDiagramProject;
}
