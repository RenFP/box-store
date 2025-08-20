import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: WritableSignal<Product[]> = signal([]);


  getItems(): Product[] {
    return this.items();
  }   
  addToCart(product: Product): void {
    this.items.set([...this.items(), product]);
  }
  
  clearCart(): void {
    this.items.set([]);
  } 

  clearItem(productId: number): void {
    this.items.set(this.items().filter(item => item.id !== productId));    
  }

  getTotalPrice(): number {
    return this.items().reduce((total, product) => total + product.price, 0);
  }

  getItemCount(): number {
    return this.items().length;
  }
}
