import { Component } from "@angular/core";
import { ToolbarComponent } from "../../components/toolbar/toolbar.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
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
}
