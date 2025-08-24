import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { jwtDecode } from 'jwt-decode';
import { UserService } from './user.service';
import { UserPersonalData } from '../interfaces/user-personal-data';




//Interface Response da FakeStore
interface AuthTokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://fakestoreapi.com/';
  private http = inject(HttpClient);
  private userService = inject(UserService);;



  login(user: User): Observable<UserPersonalData> {
    return this.http.post<AuthTokenResponse>(`${this.apiUrl}/auth/login`, user).pipe(
      switchMap((res) => {
        const token = res.token
        localStorage.setItem('token', token);

        const decode: any = jwtDecode(token)
        const userId = decode.sub;        
        
        return this.userService.getUserById(userId);

      }),
      catchError((err) => {
        console.log('Login failed: ', err);
        return throwError(() => err);
      })
    )
  }

  logOut() {
    localStorage.removeItem('token');
    this.userService.clearCurrentUser();
  }


  register(user: User): Observable<AuthTokenResponse> {
    return this.http.post<AuthTokenResponse>(`${this.apiUrl}/users`, user).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  getToken() {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    } else {
      return null;
    }
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }


}
