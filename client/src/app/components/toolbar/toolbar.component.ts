import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { LogoComponent } from "../logo/logo.component";
import { Router } from "@angular/router";
import { HostListener } from "@angular/core";
import { UserAuthService } from "../../services/user-auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-toolbar",
  standalone: true,
  imports: [CommonModule, MatToolbarModule, LogoComponent],
  templateUrl: "./toolbar.component.html",
  styleUrl: "./toolbar.component.scss",
})
export class ToolbarComponent {
  authenticated: boolean = false;
  private authStatusSub: Subscription | null = null;
  attached: Boolean = true;

  constructor(private router: Router, private authApi: UserAuthService) {}

  ngOnInit() {
    this.authStatusSub = this.authApi.isLoggedIn.subscribe((status) => {
      this.authenticated = status;
    });
  }

  ngOnDestroy() {
    if (this.authStatusSub) {
      this.authStatusSub.unsubscribe();
    }
  }

  @HostListener("window:scroll", []) onWindowScroll() {
    if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
      if (this.attached) this.attached = false;
    } else if (!this.attached) {
      this.attached = true;
    }
  }

  startPracticingClickHandler() {
    if (!this.authenticated) {
      this.router.navigate(["/signup"]);
    } else {
      this.router.navigate(["/problems"]);
    }
  }

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }
}
