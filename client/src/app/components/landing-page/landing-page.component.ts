import { Component } from "@angular/core";
import { ToolbarComponent } from "../toolbar/toolbar.component";

@Component({
  selector: "app-landing-page",
  standalone: true,
  imports: [ToolbarComponent],
  templateUrl: "./landing-page.component.html",
  styleUrl: "./landing-page.component.scss",
})
export class LandingPageComponent {}
