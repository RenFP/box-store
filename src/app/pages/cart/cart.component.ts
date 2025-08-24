import { Component, inject } from '@angular/core';
import { CartItemComponent } from "../../components/cart-item/cart-item.component";
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { ProductCart } from '../../interfaces/product-cart';


@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartService = inject(CartService);
  cartItems: ProductCart[] = [] as ProductCart[] 


  ngOnInit() {
    this.cartItems = this.cartService.getItems();

    console.log(this.cartItems);

  }

  deleteItem(productId: number): void {
    this.cartService.clearItem(productId);
  }

  incrementItem(productId: number) {
    this.cartService.incrementQuantity(productId);
  }

  decrementItem(productId: number) {
    this.cartService.decrementQuantity(productId);
  }


}
