import { Component } from '@angular/core';
import { SignupFormComponent } from '../components/form/signup-form/signup-form.component';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [SignupFormComponent],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent {
  
}
