import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SignupPageComponent } from "./pages/signup-page/signup-page.component";
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, LandingPageComponent, SignupPageComponent],
  template: ` <router-outlet /> `,
  styles: [],
})
export class AppComponent {
  title = "SystemWise";
}
