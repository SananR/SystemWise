import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { LogoComponent } from "../../logo/logo.component";
import { Router } from "@angular/router";
import { HostListener } from "@angular/core";
import { UserAuthService } from "../../../services/user-auth.service";
import { Subscription } from "rxjs";
import { faPaperPlane, faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@Component({
  selector: "app-problem-toolbar",
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, MatToolbarModule, LogoComponent],
  templateUrl: "./problem-toolbar.component.html",
  styleUrl: "./problem-toolbar.component.scss",
})
export class ProblemToolbarComponent {
  private authStatusSub: Subscription | null = null;
  authenticated: boolean | undefined;
  attached: Boolean = true;
  faPaperPlane = faPaperPlane;
  faComments = faComments;

  constructor(
    private router: Router,
    protected authApi: UserAuthService
  ) {}

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

  handleSignOut() {
    this.authApi.signOut().subscribe((_) => {
      this.authApi.isLoggedIn.next(false);
      this.router
        .navigateByUrl("/logout", { skipLocationChange: true })
        .then(() => {
          this.router.navigate(["/"]); // Navigate back to landing
        });
    });
  }
}
