import { Component } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { LogoComponent } from "../logo/logo.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-toolbar",
  standalone: true,
  imports: [MatToolbarModule, LogoComponent],
  templateUrl: "./toolbar.component.html",
  styleUrl: "./toolbar.component.scss",
})
export class ToolbarComponent {
  constructor(private router: Router) {}

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }
}
