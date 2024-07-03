import { Injectable } from '@angular/core';
import { UserRepositoryService } from '../repositories/user-repository.service';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class UserAuthService {

  constructor(private user: UserRepositoryService) {}

  signUp(username: string, email: string, password: string) {
    return this.user.signUp(username, email, password).pipe(catchError(e => {
      return of({success: false, error: e.error});
    }));
  }

  signIn(username: string, password: string) {
    return this.user.signIn(username, password);
  }
}
