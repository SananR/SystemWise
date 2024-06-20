import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SignupFormComponent } from "./components/form/signup-form/signup-form.component";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, LandingPageComponent, SignupFormComponent],
  template: ` <router-outlet /> `,
  styles: [],
})
export class AppComponent {
  title = "SystemWise";
}
