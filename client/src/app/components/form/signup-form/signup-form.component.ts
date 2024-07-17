import { Component, OnInit } from "@angular/core";
import { FormTextInputComponent } from "../form-text-input/form-text-input.component";
import { FormBtnComponent } from "../form-btn/form-btn.component";
import { MatDividerModule } from "@angular/material/divider";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { UserAuthService } from "../../../services/user-auth.service";
import { Router } from "@angular/router";
import { GoogleAuthBtnComponent } from "../google-auth-btn/google-auth-btn.component";
import { SocialUser } from "@abacritt/angularx-social-login";

@Component({
  selector: "app-signup-form",
  standalone: true,
  imports: [
    FormTextInputComponent,
    FormBtnComponent,
    MatDividerModule,
    CommonModule,
    FormsModule,
    GoogleAuthBtnComponent,
  ],
  templateUrl: "./signup-form.component.html",
  styleUrl: "./signup-form.component.scss",
})
export class SignupFormComponent implements OnInit {
  constructor(
    private api: UserAuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  usernameValue: string = "";
  emailValue: string = "";
  passwordValue: string = "";
  confirmPasswordValue: string = "";
  invalidSignupCredentials: boolean = false;

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
    return (
      this.passwordValue.length >= 8 &&
      this.passwordValue === this.confirmPasswordValue &&
      this.validateEmail(this.emailValue)
    );
  }

  handleSignUpButtonClick() {
    this.api
      .signUp(this.usernameValue, this.emailValue, this.passwordValue)
      .subscribe({
        next: (res) => {
          if (res.error) {
            this.invalidSignupCredentials = true;
          } else {
            this.router.navigate([`/`]);
          }
        },
      });
  }

  handleEmailValueChange(value: string) {
    this.emailValue = value;
  }

  handleUsernameValueChange(value: string) {
    this.usernameValue = value;
  }

  handlePasswordValueChange(value: string) {
    this.passwordValue = value;
  }

  handleConfirmPasswordValueChange(value: string) {
    this.confirmPasswordValue = value;
  }

  handleSignInButtonClick() {
    this.router.navigate(["/login"]);
  }

  handleGoogleSignup(user: SocialUser) {
    this.api.signUpWithGoogle(user.idToken, user.email, user.name).subscribe({
      next: (res) => {
        if (res.error) {
          this.invalidSignupCredentials = true;
        } else {
          this.router.navigate(["/"]);
        }
      },
    });
  }
}
