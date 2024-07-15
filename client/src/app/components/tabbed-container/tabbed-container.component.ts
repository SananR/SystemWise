import { Component, EventEmitter, Output } from "@angular/core";
import { TabbedContainerItemComponent } from "./tabbed-container-item/tabbed-container-item.component";
import { CommonModule, NgFor, NgClass } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";

@Component({
  selector: "app-tabbed-container",
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    TabbedContainerItemComponent,
    NgClass,
    NgFor,
  ],
  templateUrl: "./tabbed-container.component.html",
  styleUrl: "./tabbed-container.component.scss",
})
export class TabbedContainerComponent {
  faBook = faBook;

  tabs: TabbedContainerItemComponent[] = [];
  @Output() currentTabChange = new EventEmitter<TabbedContainerItemComponent>();

  activeTab!: TabbedContainerItemComponent;

  addTab(tab: TabbedContainerItemComponent) {
    this.tabs.push(tab);
  }

  ngOnInit() {
    this.updateActiveTab(this.tabs[0]);
  }

  updateActiveTab(tab: TabbedContainerItemComponent) {
    this.tabs.forEach((tab) => {
      tab.active = false;
    });
    tab.active = true;
    this.activeTab = tab;
  }
}
