import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { ButtonComponent } from "../../components/button/button.component";
import { CommonModule } from '@angular/common';
import { BtnCounterComponent } from "../../components/btn-counter/btn-counter.component";
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-detail',
  imports: [ButtonComponent, CommonModule, BtnCounterComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  private productService = inject(ProductService);
  private activatedRoute = inject(ActivatedRoute);
  private cartService = inject(CartService);
  private authService = inject(AuthService)

  private productId: number | null = null;
  product: Product  = {} as Product;
  
  ngOnInit() {
    this.productId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.productService.getProductById(this.productId).subscribe(response => this.product = response)  
  }

  addToCart(product: Product): void {
    if(product && this.authService.isLoggedIn()){
      this.cartService.addToCart(product);
      console.log(this.cartService.getItems());
    } else {

      console.log('Usuario precisa estar logado!')
    }
  }
 
}
