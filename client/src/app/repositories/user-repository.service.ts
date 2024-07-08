import { Injectable } from "@angular/core";
import { ApiService } from "../services/api.service";

interface SignupResponse {
  success: boolean;
  error?: string;
  username?: string;
}

interface MeResponse {
  success: boolean;
  error: string;
  username?: string;
}
import APIResponse from "../util/api-response";

@Injectable({
  providedIn: "root",
})
export class UserRepositoryService {
  constructor(private api: ApiService) {}

  signUp(username: string, email: string, password: string) {
    return this.api.post<APIResponse>(`/api/users/signup`, {
      username: username,
      email: email,
      password: password,
    });
  }

  signIn(email: string, password: string) {
    return this.api.post<APIResponse>(`/api/users/login`, {
      email: email,
      password: password,
    });
  }

  me() {
    return this.api.get<APIResponse>(`/api/users/me`);
  }

  signUpWithGoogle(idToken: string, email: string, name: string) {
    return this.api.post<SignupResponse>(`/api/users/signup/google`, {
      idToken: idToken,
      email: email,
      name: name,
    });
  }

  signOut() {
    return this.api.get(`/api/users/signout`);
  }
}
