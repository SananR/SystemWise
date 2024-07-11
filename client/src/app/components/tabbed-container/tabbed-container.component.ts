import { Component, ContentChildren, QueryList } from "@angular/core";
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

  @ContentChildren(TabbedContainerItemComponent)
  tabs!: QueryList<TabbedContainerItemComponent>;

  activeTab!: TabbedContainerItemComponent;

  ngAfterContentInit() {
    this.activeTab = this.tabs.first;
  }
}
