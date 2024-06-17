import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LandingPageComponent],
  template: `
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'SystemWise';
}
