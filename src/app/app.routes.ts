import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductComponent } from './pages/product/product.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
    {
        path: 'home', component: HomeComponent,
        children: [
            { path: 'product', component: ProductComponent },
            { path: 'product/:id', component: ProductDetailComponent, canActivate: [adminGuard] },
            { path: 'cart', component: CartComponent },
            { path: '', redirectTo: 'product', pathMatch: 'full' },  

        ]
    },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'home/product', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent }
];
