import { Component } from "@angular/core";
import { LoginFormComponent } from "../../components/form/login-form/login-form.component";
import { ToolbarComponent } from "../../components/toolbar/toolbar.component";


@Component({
    selector: "app-login-page",
    standalone: true,
    imports: [LoginFormComponent, ToolbarComponent],
    templateUrl: "./login-page.component.html",
    styleUrl: "./login-page.component.scss",
  })
  export class LoginPageComponent {}