import { ChangeDetectorRef, Component, Input } from "@angular/core";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { ViewChild, TemplateRef } from "@angular/core";
import { TabbedContainerComponent } from "../tabbed-container.component";

@Component({
  selector: "app-tabbed-container-item",
  standalone: true,
  imports: [],
  templateUrl: "./tabbed-container-item.component.html",
  styleUrl: "./tabbed-container-item.component.scss",
  host: {
    "[class.hidden]": "!active",
  },
})
export class TabbedContainerItemComponent {
  @ViewChild("content") template!: TemplateRef<any>;

  @Input() tabName? = "default";
  @Input() tabIcon = faBook;
  @Input() iconColor = "green";
  @Input() active: boolean = false;

  constructor(tabs: TabbedContainerComponent) {
    tabs.addTab(this);
  }

  ngOnInit() {
    // this.cdRef.reattach();
  }
}
