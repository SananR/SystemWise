import { Component } from "@angular/core";
import { FormTextInputComponent } from "../form-text-input/form-text-input.component";
import { FormBtnComponent } from "../form-btn/form-btn.component";
import { MatDividerModule } from "@angular/material/divider";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { UserAuthService } from "../../../services/user-auth.service";
import { Router } from "@angular/router";
import { GoogleAuthBtnComponent } from "../google-auth-btn/google-auth-btn.component";
import { SocialUser } from "@abacritt/angularx-social-login";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-login-form",
  standalone: true,
  imports: [
    FormTextInputComponent,
    FormBtnComponent,
    MatDividerModule,
    CommonModule,
    FormsModule,
    GoogleAuthBtnComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  emailValue: string = "";
  passwordValue: string = "";
  invalidCredentials: boolean = false;
  isLoading: boolean = false;
  isGoogleLoading: boolean = false;

  constructor(
    private api: UserAuthService,
    private router: Router
  ) {}

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
    this.isLoading = true;
    this.api.signIn(this.emailValue, this.passwordValue).subscribe({
      next: (res) => {
        this.isLoading = false;
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

  handleGoogleSignin(user: SocialUser) {
    this.isGoogleLoading = true;
    this.api.signInWithGoogle(user.idToken, user.email, user.name).subscribe({
      next: (res) => {
        this.isGoogleLoading = false;
        if (res.error) {
          this.invalidCredentials = true;
        } else {
          this.router.navigate(["/"]);
        }
      },
    });
  }

  handleEmailValueChange(value: string) {
    this.emailValue = value;
  }

  handlePasswordValueChange(value: string) {
    this.passwordValue = value;
  }
}
