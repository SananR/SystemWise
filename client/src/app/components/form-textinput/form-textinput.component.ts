import { Component, Input } from '@angular/core';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-form-textinput',
  standalone: true,
  imports: [MatInputModule],
  templateUrl: './form-textinput.component.html',
  styleUrl: './form-textinput.component.css'
})
export class FormTextinputComponent {
  @Input() id: string | undefined;
  @Input() placeholder: string | undefined;
}
