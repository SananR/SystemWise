import { Component } from '@angular/core';
import { FormTextInputComponent } from '../form-text-input/form-text-input.component';
import { FormBtnComponent } from '../form-btn/form-btn.component';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [FormTextInputComponent, FormBtnComponent, MatDividerModule],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss'
})
export class SignupFormComponent {

}
