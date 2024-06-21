import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-form-text-input",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./form-text-input.component.html",
  styleUrl: "./form-text-input.component.scss",
})
export class FormTextInputComponent {
  @Input() placeholder: string = "";
  @Input() type: string = "text";
  @Input() additionalClasses: string = "";

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>;
  value: string = '';

  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.value = inputElement.value;
    this.valueChange.emit(this.value);
  }
}
