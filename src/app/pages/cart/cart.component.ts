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
  private cartService = inject(CartService);
  cartItems: ProductCart[] = [] as ProductCart[]
  totalOrder: number = 0;


  ngOnInit() {
    this.cartItems = this.cartService.getItems();
    this.totalOrder = this.cartService.getTotalPrice();
    console.log(this.cartItems);
    
  }

  deleteItem(productId: number): void {
  
  }

  incrementItem(productId: number){
    this.cartService.incrementQuantity(productId);
    this.totalOrder = this.cartService.getTotalPrice();
  }

  decrementItem(productId: number){
    this.cartService.decrementQuantity(productId);
    this.totalOrder = this.cartService.getTotalPrice();
  }
  

}
