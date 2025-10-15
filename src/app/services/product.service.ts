import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://fakestoreapi.com/products');
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`https://fakestoreapi.com/products/${product.id}`, product);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`https://fakestoreapi.com/products/${id}`);
  }

  deleteProduct(productId: number): Observable<Product> {
    return this.http.delete<Product>(`https://fakestoreapi.com/products/${productId}`);
  }
}
