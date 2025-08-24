import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const userToken: any = localStorage.getItem('token');
  const authService = inject(AuthService);

  const tokenDecoded: any = userToken ? jwtDecode(userToken) : null;

  if (authService.isLoggedIn()) {
    if (tokenDecoded && tokenDecoded.user === 'johnd') {
      return true;
    }
  }

  router.navigate(['/login']);
  return false
}
