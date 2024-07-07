import { Injectable, inject } from "@angular/core";
import { UserRepositoryService } from "../repositories/user-repository.service";
import { tap, BehaviorSubject, first, catchError, of } from "rxjs";

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
        return of({ error: "Not authenticated" });
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
      catchError((_) => {
        return of({ error: "Not authenticated" });
      })
    );
  }

  signOut() {
    return this.user.signOut().pipe(catchError((e) => {
      return of({ error: e })}));
  }
}
