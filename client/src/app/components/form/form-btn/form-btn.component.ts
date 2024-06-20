import { Component, Input } from "@angular/core";
import { CommonModule } from '@angular/common';


@Component({
  selector: "app-form-btn",
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: "./form-btn.component.html",
  styleUrl: "./form-btn.component.scss",
})
export class FormBtnComponent {
  @Input() label: string = "Submit";
  @Input() isIconHidden: boolean = true;
  @Input() icon: string = "";
  @Input() additionalClasses: string = "";
}
