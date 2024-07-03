import { Routes } from "@angular/router";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { SignupFormComponent } from "./components/form/signup-form/signup-form.component";
import { SignupPageComponent } from "./signup-page/signup-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";


export const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "signup", component: SignupPageComponent },
  { path: "login", component: LoginPageComponent },
];
