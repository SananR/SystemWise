import { Routes } from "@angular/router";
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { SignupPageComponent } from "./pages/signup-page/signup-page.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { ProblemPageComponent } from "./pages/problem-page/problem-page.component";

export const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "signup", component: SignupPageComponent },
  { path: "login", component: LoginPageComponent },
  { path: "problem", component: ProblemPageComponent },
  //TODO 404 Not found page
  { path: "**", component: LandingPageComponent },
];
