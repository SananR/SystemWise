import { Component } from "@angular/core";
import { FormTextInputComponent } from "../form-text-input/form-text-input.component";
import { FormBtnComponent } from "../form-btn/form-btn.component";
import { MatDividerModule } from "@angular/material/divider";
import { FormControl, FormGroup, FormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";

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

export class SignupFormComponent {
  emailValue: string = '';
  passwordValue: string = '';
  confirmPasswordValue: string = '';
  
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

    alert('submit form!');
  }

  handleGoogleAuthButtonClick() {
    alert('google oauth button clicked!');
  }

  handleEmailValueChange(value: string) {
    this.emailValue = value;
  }

  handlePasswordValueChange(value: string) {
    this.passwordValue = value;
  }

  handleConfirmPasswordValueChange(value: string) {
    this.confirmPasswordValue = value;
  }
}
