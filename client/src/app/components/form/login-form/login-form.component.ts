import { Component } from "@angular/core";
import { FormTextInputComponent } from "../form-text-input/form-text-input.component";
import { FormBtnComponent } from "../form-btn/form-btn.component";
import { MatDividerModule } from "@angular/material/divider";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { UserAuthService } from "../../../services/user-auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login-form",
  standalone: true,
  imports: [
    FormTextInputComponent,
    FormBtnComponent,
    MatDividerModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  emailValue: string = "";
  passwordValue: string = "";
  invalidCredentials: boolean = false;

  constructor(private api: UserAuthService, private router: Router) {}

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  getEmailControlClass() {
    return this.validateEmail(this.emailValue) && this.emailValue.length > 0
      ? "border-danger"
      : "";
  }

  isFormValid() {
    return this.validateEmail(this.emailValue);
  }

  handleSignInButtonClick() {
    this.api.signIn(this.emailValue, this.passwordValue).subscribe({
      next: (res) => {
        if (res.error) {
          this.invalidCredentials = true;
        } else {
          this.router.navigate([`/`]);
        }
      },
    });
  }

  handleSignUpButtonClick() {
    this.router.navigate(["/signup"]);
  }

  handleGoogleAuthButtonClick() {
    alert("Google OAuth button clicked!");
  }

  handleEmailValueChange(value: string) {
    this.emailValue = value;
  }

  handlePasswordValueChange(value: string) {
    this.passwordValue = value;
  }
}
