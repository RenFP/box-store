import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://fakestoreapi.com/';
  private http = inject(HttpClient);
  
  login(user: any): Observable<any> {
    console.log(user)
    return this.http.post(`${this.apiUrl}/auth/login`, user).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }
  isLoggedIn(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, user).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );

  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users`).pipe(
      tap((user: User) => {
        console.log('User fetched:', user);
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }
}