import { Component, Input } from "@angular/core";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { ViewChild, TemplateRef } from "@angular/core";

@Component({
  selector: "app-tabbed-container-item",
  standalone: true,
  imports: [],
  templateUrl: "./tabbed-container-item.component.html",
  styleUrl: "./tabbed-container-item.component.scss",
})
export class TabbedContainerItemComponent {
  @ViewChild("content") template!: TemplateRef<any>;

  @Input() tabName? = "default";
  @Input() tabIcon = faBook;
  @Input() iconColor = "green";
}
