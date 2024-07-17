import { Component, ElementRef, ViewChild } from "@angular/core";
import mermaid from "mermaid";
import { FormsModule } from "@angular/forms";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FlowchartComponent } from "../flowchart/flowchart.component";
import { BehaviorSubject, Subject } from "rxjs";

@Component({
  selector: "app-flowchart-editor",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./flowchart-editor.component.html",
  styleUrl: "./flowchart-editor.component.scss",
})
export class FlowchartEditorComponent {
  @ViewChild("mermaidDiagram") mermaidDiagram: ElementRef | undefined;
  chartRendered: BehaviorSubject<boolean> = new BehaviorSubject(false);

  graphDefinition = `flowchart TD;\n
    B[client] --> C[load balancer];\n
    C --> D[Server];\n
    D --> E[Redis Cache];\n
    D --> F[Blob Database];\n`;

  ngAfterViewInit(): void {
    mermaid.initialize({
      themeVariables: {
        primaryColor: "#4e9f3d",
        primaryTextColor: "#fff",
        primaryBorderColor: "#7C0000",
        lineColor: "white",
        secondaryColor: "#006100",
        tertiaryColor: "#fff",
      },
      fontSize: 16,
    });
    this.renderChart();
  }

  renderChart() {
    this.chartRendered.next(false);
    const element: any = this.mermaidDiagram!.nativeElement;

    mermaid
      .render("graphDiv", this.graphDefinition)
      .then(({ svg, bindFunctions }) => {
        element.innerHTML = svg;
        bindFunctions?.(element);
        this.chartRendered.next(true);
      });
  }
}
