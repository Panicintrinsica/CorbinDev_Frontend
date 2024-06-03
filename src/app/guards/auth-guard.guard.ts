import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";
import {map} from "rxjs";

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isTokenExpired()) return router.parseUrl('/');

  return authService.isVerified()
    .pipe(map(isVerified => isVerified || router.parseUrl('/admin')))
};
