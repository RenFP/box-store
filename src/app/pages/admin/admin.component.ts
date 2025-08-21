
import { Component, inject } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

//PRIMENG
import { Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ModalComponent } from "../../components/modal/modal.component"



@Component({
  selector: 'app-admin',
  imports: [TableModule, CommonModule, InputTextModule, TagModule,
    SelectModule, MultiSelectModule, ButtonModule, IconFieldModule, InputIconModule, ModalComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  productService = inject(ProductService);
  products: Product[] = [] as Product[];
  selectedProducts!: Product[];
  searchValue: string | undefined;
  visible: boolean = false;
  selectedProduct: Product = {} as Product;


  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = ''
  }

  showDialog(product: Product) {
    this.visible = !this.visible;
    this.selectedProduct = product;
  }

  closeDialog(visibility: boolean) {
    this.visible = visibility;
  }
}
