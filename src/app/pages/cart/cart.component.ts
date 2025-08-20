import { Component, inject } from '@angular/core';
import { CartItemComponent } from "../../components/cart-item/cart-item.component";
import { CartService } from '../../services/cart.service';
import { Product } from '../../interfaces/product';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  private cartService = inject(CartService);
  products: Product[] = [] as Product[]
  totalOrder: number = 0;


  ngOnInit() {
    this.products = this.cartService.getItems();
    this.totalOrder = this.cartService.getTotalPrice();
    console.log(this.products);
    
  }

  deleteItem(productId: number): void {
    this.cartService.clearItem(productId);
    console.log('Produto deletado')
  }



}
