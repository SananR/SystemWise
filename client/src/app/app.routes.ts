import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'signup', component: SignupPageComponent }
];
