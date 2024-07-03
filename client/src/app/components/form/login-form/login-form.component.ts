import { Component } from "@angular/core";
import { FormTextInputComponent } from "../form-text-input/form-text-input.component";
import { FormBtnComponent } from "../form-btn/form-btn.component";
import { MatDividerModule } from "@angular/material/divider";
import { FormControl, FormGroup, FormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-login-form",
  standalone: true,
  imports: [FormTextInputComponent, 
            FormBtnComponent, 
            MatDividerModule, 
            CommonModule, 
            FormsModule],
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  emailValue: string = '';
  passwordValue: string = '';

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  getEmailControlClass() {
    return this.validateEmail(this.emailValue) && this.emailValue.length > 0 ? 'border-danger' : '';
  }

  isFormValid() {
    return this.passwordValue.length >= 8 && this.validateEmail(this.emailValue);
  }

  handleSignInButtonClick() {
    alert('Login form submitted!');
  }

  handleGoogleAuthButtonClick() {
    alert('Google OAuth button clicked!');
  }

  handleEmailValueChange(value: string) {
    this.emailValue = value;
  }

  handlePasswordValueChange(value: string) {
    this.passwordValue = value;
  }
}
