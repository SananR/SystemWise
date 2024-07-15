import { Component, ElementRef, ViewChild } from "@angular/core";
import mermaid from "mermaid";
import { FormsModule } from "@angular/forms";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
  selector: "app-flowchart-editor",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./flowchart-editor.component.html",
  styleUrl: "./flowchart-editor.component.scss",
})
export class FlowchartEditorComponent {
  graphDefinition = "graph TB\na-->b";

  ngOnInit() {
    // mermaid.initialize({ startOnLoad: true });
  }

  async ngAfterViewInit() {
    // mermaid.initialize({ startOnLoad: true });
    // mermaid.run(undefined);
    // const graphDefinition = "graph TB\na-->b";
    // const { svg } = await mermaid.render(`diagram`, graphDefinition);
    // this.mermaid.nativeElement.innerHTML = svg;
  }
}
