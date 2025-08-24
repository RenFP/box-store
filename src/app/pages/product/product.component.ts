import { Component, computed, inject, signal } from '@angular/core';
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

  productList:  Product[] = []
  filteredList: Product[] = []


  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.productList = data;
      this.filteredList = data;      
    });
  }

  onSelectedCategory(category: string) {
    this.filteredList = this.productList.filter(product => product.category === category)
  }

}
