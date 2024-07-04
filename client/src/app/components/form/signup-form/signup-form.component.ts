import { Component, OnInit } from "@angular/core";
import { FormTextInputComponent } from "../form-text-input/form-text-input.component";
import { FormBtnComponent } from "../form-btn/form-btn.component";
import { MatDividerModule } from "@angular/material/divider";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { UserAuthService } from "../../../services/user-auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup-form",
  standalone: true,
  imports: [FormTextInputComponent, 
            FormBtnComponent, 
            MatDividerModule, 
            CommonModule, 
            FormsModule],
  templateUrl: "./signup-form.component.html",
  styleUrl: "./signup-form.component.scss",
})

export class SignupFormComponent implements OnInit {

  constructor(private api: UserAuthService, private router: Router) { }

  ngOnInit(): void {}

  usernameValue: string = '';
  emailValue: string = '';
  passwordValue: string = '';
  confirmPasswordValue: string = '';
  invalidSignupCredentials: boolean = false;
  
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  getEmailControlClass() {
    return this.validateEmail(this.emailValue) && this.emailValue.length > 0 ? 'border-danger' : '';
  }

  isFormValid() {
    return this.passwordValue.length >= 8 && this.passwordValue === this.confirmPasswordValue && this.validateEmail(this.emailValue);
  }
  
  handleSignUpButtonClick() {
    this.api.signUp(this.usernameValue, this.emailValue, this.passwordValue).subscribe({
      next: (res) => {
        if (res.error) {
          this.invalidSignupCredentials = true;
        } else {
          this.router.navigate([`/`]);
        }
      }
    });
  }
  handleGoogleAuthButtonClick() {
    alert('google oauth button clicked!');
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
    this.router.navigate(['/login']);
  }
}
