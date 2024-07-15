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
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { SubmissionsService } from "../../../services/submissions.service";
import { ProblemService } from "../../../services/problem.service";

@Component({
  selector: "app-problem-toolbar",
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    MatToolbarModule,
    LogoComponent,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: "./problem-toolbar.component.html",
  styleUrl: "./problem-toolbar.component.scss",
})
export class ProblemToolbarComponent {
  private authStatusSub: Subscription | null = null;
  authenticated: boolean | undefined;
  attached: Boolean = true;
  submitPending: Boolean = false;
  faPaperPlane = faPaperPlane;
  faComments = faComments;

  constructor(
    private router: Router,
    protected authApi: UserAuthService,
    private snackBar: MatSnackBar,
    private submissionService: SubmissionsService,
    private problemService: ProblemService
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

  handleSubmit() {
    // If not logged in send to login page
    if (!this.authenticated) {
      this.router.navigate(["/login"]);
      return;
    }
    const content: string = this.problemService.getTextContent();
    // Sanity checks / validation on content
    if (!content || content.length <= 20) {
    }

    this.submitPending = true;
    this.snackBar.open(
      "Your submission is being graded! Awaiting your results...",
      "Close",
      {
        duration: 3000,
        verticalPosition: "top",
        horizontalPosition: "center",
        panelClass: ["position-fixed", "top-0", "z-10", "right-0"],
      }
    );
    this.submissionService.createSubmission(content);
    this.submissionService.submissionResult.subscribe((res) => {
      console.log(res);
      this.submissionService.submissionResult.complete();
    });
  }
}
