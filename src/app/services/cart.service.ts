import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { ProductCart } from '../interfaces/product-cart';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: WritableSignal<ProductCart[]> = signal([]);

  public readonly cartItems = this.items.asReadonly();
  public readonly totalItems = computed(() => this.items().length);
  public readonly totalPrice = computed(() => this.items().reduce((total, cartItem) => total + cartItem.product.price, 0));


  getItems(): ProductCart[] {
    return this.items();
  }   
  addToCart(product: Product, quantity: number): void { 
    if (this.items().some(item => item.product.id === product.id)) {
      this.incrementQuantity(product.id);
      return;
    }
    
    this.items.set([...this.items(), { product, quantity }]);
  }
  
  clearCart(): void {
    this.items.set([]);
  } 

  clearItem(productId: number): void {
    this.items.set(this.items().filter(item => item.product.id !== productId));    
  }

  incrementQuantity(productId: number): void {
    const itemIndex = this.items().findIndex(item => item.product.id === productId);
    if (itemIndex !== -1) {
      this.items()[itemIndex].quantity++;
    }
  }

  decrementQuantity(productId: number): void {
    const itemIndex = this.items().findIndex(item => item.product.id === productId);
    if (itemIndex !== -1) {
      if (this.items()[itemIndex].quantity > 1) {
        this.items()[itemIndex].quantity--;
      }
    }
  }

}
