import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { ProductCart } from '../interfaces/product-cart';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: WritableSignal<ProductCart[]> = signal([]);

  public readonly cartItems = this.items.asReadonly();
  public readonly totalItems = computed(() => this.cartItems().length);
  public readonly totalPrice = computed(() => this.cartItems().reduce((total, cartItem) => total + (cartItem.product.price * cartItem.quantity), 0));

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
    this.items.update(items =>
      items.map(item =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity += 1 }
          : item
      )
    );
  }


  decrementQuantity(productId: number): void {
    const existingItem = this.items().find(item => item.product.id === productId);

    if (existingItem && existingItem.quantity <= 1) {
      this.clearItem(productId);
    } else {
      this.items.update(items =>
        items.map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity -= 1 }
            : item
        )
      );
    }
  }

}
