import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { SignupFormComponent } from "./components/signup-form/signup-form.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, LandingPageComponent, SignupFormComponent],
  template: `
    <h1>Welcome to {{ title }}!</h1>
    <app-signup-form></app-signup-form>
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = "SystemWise";
}
