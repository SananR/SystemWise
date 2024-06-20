import { Component, Input } from "@angular/core";

@Component({
  selector: "app-form-btn",
  standalone: true,
  imports: [],
  templateUrl: "./form-btn.component.html",
  styleUrl: "./form-btn.component.scss",
})
export class FormBtnComponent {
  @Input() label: string = "Submit";
  @Input() isIconHidden: boolean = true;
  @Input() icon: string = "";
}
