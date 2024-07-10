import { Component } from "@angular/core";
import { TextEditorComponent } from "../../components/text-editor/text-editor.component";

@Component({
  selector: "app-problem-page",
  standalone: true,
  imports: [TextEditorComponent],
  templateUrl: "./problem-page.component.html",
  styleUrl: "./problem-page.component.scss",
})
export class ProblemPageComponent {}
