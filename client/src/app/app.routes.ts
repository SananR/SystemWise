import { Routes } from "@angular/router";
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { SignupPageComponent } from "./pages/signup-page/signup-page.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { ProblemPageComponent } from "./pages/problem-page/problem-page.component";
import { authGuard } from "./guards/auth.guard";

export const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "signup", component: SignupPageComponent, canActivate: [authGuard] },
  { path: "login", component: LoginPageComponent, canActivate: [authGuard] },
  { path: "problem", component: ProblemPageComponent },
  //TODO 404 Not found page
  { path: "**", component: LandingPageComponent },
];
