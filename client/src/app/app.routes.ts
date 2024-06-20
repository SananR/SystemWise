import { Routes } from "@angular/router";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { SignupFormComponent } from "./components/form/signup-form/signup-form.component";

export const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "signup", component: SignupFormComponent },
];
