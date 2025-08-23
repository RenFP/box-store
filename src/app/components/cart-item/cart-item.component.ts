import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BtnCounterComponent } from "../btn-counter/btn-counter.component";
import { CurrencyPipe } from '@angular/common';
import { ProductCart } from '../../interfaces/product-cart';


@Component({
  selector: 'app-cart-item',
  imports: [BtnCounterComponent, CurrencyPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  @Input() productItem: ProductCart = {} as ProductCart;
  @Output() onDeletItem = new EventEmitter<Event>()
  @Output() onIncrementItem = new EventEmitter<Event>()
  @Output() onDecrementItem = new EventEmitter<Event>()


}
