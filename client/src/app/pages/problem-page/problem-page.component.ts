import { Component } from "@angular/core";
import { TextEditorComponent } from "../../components/text-editor/text-editor.component";
import { ToolbarComponent } from "../../components/toolbar/toolbar.component";

@Component({
  selector: "app-problem-page",
  standalone: true,
  imports: [TextEditorComponent, ToolbarComponent],
  templateUrl: "./problem-page.component.html",
  styleUrl: "./problem-page.component.scss",
})
export class ProblemPageComponent {}
