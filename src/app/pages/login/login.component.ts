import { Component, inject } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox'
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [DividerModule, InputTextModule, FloatLabel, ReactiveFormsModule, ButtonModule, Checkbox],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginService = inject(AuthService);
  router = inject(Router);
  remenberMe = false;

  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  })

  login() {
    this.loginService.login(this.loginForm.value).subscribe({
      next: (response) => {        
        this.router.navigate(['/home']);
        if (this.remenberMe) {
          localStorage.setItem('token', response.token);
        } else {
          sessionStorage.setItem('token', response.token);
        }
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
  register() {
    this.loginService.register(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        if (this.remenberMe) {
          localStorage.setItem('token', response.token);
        } else {
          sessionStorage.setItem('token', response.token);
        }
      },
      error: (error) => {
        console.error('Registration failed', error);
      }
    });
  }

  getUser() {
    this.loginService.getUser().subscribe({
      next: (user) => {
        console.log('User fetched:', user);
        localStorage.setItem('user', JSON.stringify(user));
      },
      error: (error) => {
        console.error('Error fetching user:', error);
      }
    });
  }
  

  
  show() {
    console.log(this.remenberMe)
  }


}
