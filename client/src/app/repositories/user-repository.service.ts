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

@Injectable({
  providedIn: "root",
})
export class UserRepositoryService {
  constructor(private api: ApiService) {}

  signUp(username: string, email: string, password: string) {
    return this.api.post<SignupResponse>(`/api/users/signup`, {
      username: username,
      email: email,
      password: password,
    });
  }

  signIn(username: string, password: string) {
    return this.api.post(`/api/users/signin`, {
      username: username,
      password: password,
    });
  }

  me() {
    return this.api.get<MeResponse>(`/api/users/me`);
  }

  signOut() {
    return this.api.get(`/api/users/signout`);
  }
}
