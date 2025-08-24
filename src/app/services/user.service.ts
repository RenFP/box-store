import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { UserPersonalData } from '../interfaces/user-personal-data';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://fakestoreapi.com/';
  private http = inject(HttpClient);
  userData: WritableSignal<any> = signal([]);

  getUserById(id: string): Observable<UserPersonalData> {
    return this.http.get<UserPersonalData>(`${this.apiUrl}/users/${(id)}`)
  }

  loadCurrentUser(data: UserPersonalData) {
    localStorage.setItem('user-name', JSON.stringify(data.name));
    this.userData.set(JSON.stringify(data.name))
  }

  getCurrentUser() {
    const userString = localStorage.getItem('user-name');
    if (userString) {
      const user = JSON.parse(userString);
      return `${user.firstname} ${user.lastname}`;
    }
    return null;
  }

  isAdmin() {
    const user = localStorage.getItem('user-name');

    if (user) {
      const userData = JSON.parse(user
      );
      if (userData.firstname === 'john') return true
    }
    return false
  }

  clearCurrentUser() {
    localStorage.removeItem('user-name');
  }

}
  