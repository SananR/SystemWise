import { Injectable } from "@angular/core";
import { UserRepositoryService } from "../repositories/user-repository.service";
import { catchError, of, tap, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserAuthService {
  constructor(private user: UserRepositoryService) {}
  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  signUp(username: string, email: string, password: string) {
    return this.user.signUp(username, email, password).pipe(
      catchError((e) => {
        return of({ success: false, error: e.error });
      }),
      tap((res) => {
        if (!res.error) {
          this.isLoggedIn.next(true);
        }
      })
    );
  }

  signIn(username: string, password: string) {
    return this.user.signIn(username, password);
  }

  me() {
    return this.user.me().pipe(
      catchError((e) => {
        this.isLoggedIn.next(false);
        return of({ success: false, error: e.error });
      })
    );
  }

  signUpWithGoogle(idToken: string, email: string, name: string) {
    return this.user.signUpWithGoogle(idToken, email, name);
  }
}
