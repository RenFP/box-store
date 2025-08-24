import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ButtonComponent } from "../../components/button/button.component";
import { CommonModule } from '@angular/common';
import { BtnCounterComponent } from "../../components/btn-counter/btn-counter.component";
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Rating } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { Product } from '../../interfaces/product';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-detail',
  imports: [ButtonComponent, CommonModule, BtnCounterComponent, Rating, FormsModule, ToastModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  providers: [MessageService]
})
export class ProductDetailComponent {
  private productService = inject(ProductService);
  private activatedRoute = inject(ActivatedRoute);
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private productId: number | null = null;
  product: Product = {} as Product;
  productQuantity: number = 1;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.productId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe(product => {
        this.product = product
      });
    }
  }
  toastMessage(message: string, severity: string) {
    this.messageService.add({ severity: `${severity}`, summary: 'Info', detail: `${message}`, life: 2000 });
  }

  incrementProductQuantity() {
    if (this.product) {
      this.productQuantity++;
    }
  }

  decrementProductQuantity() {
    if (this.product && this.productQuantity > 1) {
      this.productQuantity--;
    }
  }


  addToCart(): void {
    if (!this.authService.isLoggedIn()) return this.toastMessage('Usuário precisa estar logado para adicionar ao carrinho!', 'warn');

    const AVAILABLEBUY = this.productQuantity > 0 && this.product;
    if (AVAILABLEBUY) {

      this.cartService.addToCart(this.product, this.productQuantity)
      this.toastMessage('Produto adicionado ao carrinho!', 'success')

    } else {
      console.log('A quantidade do produto precisa ser maior que 0.');
    }
  }

}
