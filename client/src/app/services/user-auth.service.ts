import { Injectable, OnInit } from "@angular/core";
import { UserRepositoryService } from "../repositories/user-repository.service";
import { catchError, of, tap, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserAuthService {
  public isLoggedIn = new BehaviorSubject<boolean | null>(null);

  constructor(private user: UserRepositoryService) {
    this.me().subscribe({
      next: (res) => {
        if (res.error) {
          this.isLoggedIn.next(false);
        } else {
          this.isLoggedIn.next(true);
        }
      },
      error: (err) => {
        if (err.status === 401) {
          this.isLoggedIn.next(false); // Because error is being caught
        }
        if (!err.error.error) {
          console.log(err.error);
        }
      },
    });
  }

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

  signIn(email: string, password: string) {
    return this.user.signIn(email, password).pipe(
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

  me() {
    return this.user.me();
  }

  signUpWithGoogle(idToken: string, email: string, name: string) {
    return this.user.signUpWithGoogle(idToken, email, name).pipe(
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

  signInWithGoogle(idToken: string, email: string, name: string) {
    return this.user.signInWithGoogle(idToken, email, name).pipe(
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

  signOut() {
    return this.user.signOut().pipe(
      catchError((e) => {
        this.isLoggedIn.next(false);
        return of({ success: false, error: e.error });
      })
    );
  }
}
