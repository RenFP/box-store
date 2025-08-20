import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';

import { inject } from '@angular/core';
import { LocalstorageService } from './localstorage.service';
import { catchError, retry, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(LocalstorageService); 
  const token = storageService.getToken();

  if (!req.url.includes('/auth/login') && token) {
  req = req.clone({    
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  })
  }

  return next(req).pipe(
    retry({count: 2, delay: 1000}),
    catchError((err: HttpErrorResponse) => {
      console.error('Error:', err);

      return throwError(() => err)
    })
  )
};
