import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
  GoogleSigninButtonModule,
} from "@abacritt/angularx-social-login";

type ButtonTextType = "signin_with" | "signup_with" | "continue_with";

@Component({
  selector: "app-google-auth-btn",
  standalone: true,
  imports: [SocialLoginModule, GoogleSigninButtonModule],
  templateUrl: "./google-auth-btn.component.html",
  styleUrl: "./google-auth-btn.component.scss",
  providers: [
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              "32525365924-p5gpecl4fe0gt6uml5jn6cc8dqgcmmrr.apps.googleusercontent.com",
              {
                scopes: "openid profile email",
                oneTapEnabled: false,
              }
            ),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
    SocialAuthService,
  ],
})
export class GoogleAuthBtnComponent {
  @Input() text: ButtonTextType = "signin_with";

  @Output() buttonClick: EventEmitter<SocialUser> =
    new EventEmitter<SocialUser>();
  @Output() user: SocialUser | undefined;

  constructor(private ssoService: SocialAuthService) {}

  ngOnInit() {
    this.ssoService.authState.subscribe((user) => {
      this.user = user;
      this.buttonClick.emit(user);
    });
  }
}
