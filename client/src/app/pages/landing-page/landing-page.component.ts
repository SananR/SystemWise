import { Component } from "@angular/core";
import { ToolbarComponent } from "../../components/toolbar/toolbar.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { Router } from "@angular/router";
import { UserAuthService } from "../../services/user-auth.service";
import { Subscription } from "rxjs";

import {
  faBoltLightning,
  faBrain,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-landing-page",
  standalone: true,
  imports: [ToolbarComponent, FontAwesomeModule],
  templateUrl: "./landing-page.component.html",
  styleUrl: "./landing-page.component.scss",
})
export class LandingPageComponent {
  faBolt = faBoltLightning;
  faBrain = faBrain;
  faPeopleGroup = faPeopleGroup;

  authenticated: boolean = false;
  private authStatusSub: Subscription | null = null;

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

  getStartedClickHandler() {
    if (!this.authenticated) {
      this.router.navigate(["/signup"]);
    } else {
      this.router.navigate(["/problems"]);
    }
  }
}
