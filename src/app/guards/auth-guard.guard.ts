import { CanActivateFn } from '@angular/router';
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  if (authService.isTokenExpired()) return false;
  return authService.isVerified();
};
