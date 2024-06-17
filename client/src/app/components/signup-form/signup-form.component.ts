import { Component } from '@angular/core';
import { SubmitFormBtnComponent } from '../submit-form-btn/submit-form-btn.component';
import { FormTextinputComponent } from '../form-textinput/form-textinput.component';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [SubmitFormBtnComponent, FormTextinputComponent],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css'
})
export class SignupFormComponent {

}
