import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CurrencyPipe } from '@angular/common';
import { RouterLink} from '@angular/router';
import { Rating } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, RouterLink, Rating, FormsModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() productItem: Product = {} as Product;
  value: number= 3;
}