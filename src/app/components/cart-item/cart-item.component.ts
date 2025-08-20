import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BtnCounterComponent } from "../btn-counter/btn-counter.component";
import { Product } from '../../interfaces/product';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-cart-item',
  imports: [BtnCounterComponent, CurrencyPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  @Input() productItem: Product = {} as Product;
  @Output() onDeletItem = new EventEmitter<Event>()
}
