import { Component } from "@angular/core";
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { HostListener } from "@angular/core";

@Component({
  selector: "app-landing-page",
  standalone: true,
  imports: [ToolbarComponent],
  templateUrl: "./landing-page.component.html",
  styleUrl: "./landing-page.component.scss",
})
export class LandingPageComponent {

  @HostListener("window:scroll", []) onWindowScroll() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      console.log("scrolling");  
    }
  } 
}
