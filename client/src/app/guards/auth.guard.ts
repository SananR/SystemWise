import { CanActivateFn, Router } from "@angular/router";
import { UserAuthService } from "../services/user-auth.service";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const currentUser = inject(UserAuthService).isLoggedIn.value;

  if (!currentUser) {
    return true;
  }

  return inject(Router).navigate(["/"]);
};
