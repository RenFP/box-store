import { Component, inject } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';

import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-login',
  imports: [DividerModule, InputTextModule, FloatLabel, ReactiveFormsModule, ButtonModule, Toast, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent {
  authService = inject(AuthService);
  userService = inject(UserService);
  router = inject(Router);
  loginPage: boolean = true;
  


  constructor(private messageService: MessageService) { }


  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  })

  login() {
    this.authService.login(this.loginForm.value as User).subscribe({
      next:(user) => {        
        this.userService.loadCurrentUser(user)        
      },      
      complete: () => this.router.navigate(['/home']),
      error: (err) => console.log('Login failed: ', err)
    })

  }

  registerUser() {
    this.authService.register(this.loginForm.value as User).subscribe({
      next: (response) => {
        this.toastMsg('Registro realizado!', 'success');
        console.log('Registration successful', response);
        this.switchToRegister()
      },
      error: (error) => {
        this.toastMsg('Falha ao criar a conta!', 'warn');
        console.error('Registration failed', error);
      }
    });
  }

  switchToRegister() {
    this.loginPage = !this.loginPage;
  }
  toastMsg(msg: string, severity: string) {
    this.messageService.add({ severity: `${severity}`, summary: 'Info', detail: `${msg}`, life: 2000 });
  }
}
