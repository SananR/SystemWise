import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-text-input',
  standalone: true,
  imports: [],
  templateUrl: './form-text-input.component.html',
  styleUrl: './form-text-input.component.scss'
})
export class FormTextInputComponent {
  @Input() placeholder: string = "";
  @Input() type: string = "text";
}
