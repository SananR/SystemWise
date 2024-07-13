import { Component } from "@angular/core";
import { environment } from "../../../environment/environment";
import {
  QuickToolbarSettingsModel,
  RichTextEditorModule,
} from "@syncfusion/ej2-angular-richtexteditor";

@Component({
  selector: "app-text-editor",
  standalone: true,
  imports: [RichTextEditorModule],
  templateUrl: "./text-editor.component.html",
  styleUrl: "./text-editor.component.scss",
})
export class TextEditorComponent {
  public quickToolbar: QuickToolbarSettingsModel = {
    table: [
      "TableHeader",
      "TableRows",
      "TableColumns",
      "TableCell",
      "TableRemove",
    ],
  };

  toolbar = {
    items: [
      "Bold",
      "Italic",
      "Underline",
      "|",
      "Formats",
      "FontSize",
      "Alignments",
      "Blockquote",
      "OrderedList",
      "UnorderedList",
      "|",
      "CreateTable",
      "|",
      "Undo",
      "Redo",
      "FullScreen",
    ],
  };
}
