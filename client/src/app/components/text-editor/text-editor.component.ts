import { Component } from "@angular/core";
import { environment } from "../../../environment/environment";
import { RichTextEditorModule } from "@syncfusion/ej2-angular-richtexteditor";

@Component({
  selector: "app-text-editor",
  standalone: true,
  imports: [RichTextEditorModule],
  templateUrl: "./text-editor.component.html",
  styleUrl: "./text-editor.component.scss",
})
export class TextEditorComponent {}
