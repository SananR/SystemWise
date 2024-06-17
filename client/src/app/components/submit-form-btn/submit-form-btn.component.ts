import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-submit-form-btn',
  standalone: true,
  imports: [],
  templateUrl: './submit-form-btn.component.html',
  styleUrl: './submit-form-btn.component.css'
})
export class SubmitFormBtnComponent {
  @Input() label: string = 'Submit';
}
