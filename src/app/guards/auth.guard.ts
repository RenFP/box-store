import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  if (token) {
    return true;
  } else {
    console.warn('Access negado - Usuário precisa estar autenticado');
    alert('Usuário precisa estar autenticado')
    return false;
  }
};
