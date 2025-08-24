import { Component, inject, signal } from '@angular/core';
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { FilterComponent } from "../../components/filter/filter.component";

//Service
import { ProductService } from "../../services/product.service";
import { Product } from '../../interfaces/product';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-product',
  imports: [ProductCardComponent, FilterComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  private productService = inject(ProductService);

  productList = signal<Product[]>([])

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.productList.set(data);
      console.log(this.productList())
    });  
  }
}
