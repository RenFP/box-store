import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { Menubar } from "primeng/menubar";
import { Menu } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, BadgeModule, AvatarModule, InputTextModule, CommonModule, Ripple, Menubar, Menu, ButtonModule, ToggleSwitch, FormsModule],
  providers: [UserService, AuthService, CartService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() selectedCategory = new EventEmitter<string>();
  items: MenuItem[] | undefined;
  userActions: MenuItem[] | undefined;
  userService = inject(UserService)
  authService = inject(AuthService)
  cartService = inject(CartService)
  router = inject(Router);
  currentUser: any = null;
  userLogged: boolean = false;
  checked: boolean = false;
  @Input() counter = 0

  constructor() {
    this.currentUser = this.userService.getCurrentUser();
    this.userLogged = this.authService.isLoggedIn()
  }


  ngOnInit() {

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
          this.router.navigate(['/home']);
        }
      },
      {
        label: 'Administração',

        visible: this.userService.isAdmin(),
        icon: 'pi pi-home',
        command: () => {
          this.router.navigate(['/home/admin']);
        }
      },
    ];

    if (this.userLogged) {
      this.userActions = [
        {
          label: 'Ações',
          items: [
            {
              label: 'Sair',
              icon: 'pi pi-sign-out',
              routerLink: ['/home'],
              command: () => {
                this.authService.logOut()
                this.reloadPage()
              },
            }
          ]
        }
      ];

    } else {
      this.userActions = [
        {
          label: 'Options',
          items: [
            {
              label: 'Logar',
              icon: 'pi pi-sign-out',
              routerLink: ['/login']
            }
          ]
        }
      ];
    }
  }


  toggleDarkMode() {
    const element = document.querySelector('html');
    element?.classList.toggle('my-app-dark');

  }

  reloadPage() {
    window.location.reload();
  }


}
