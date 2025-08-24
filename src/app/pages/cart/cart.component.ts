import { Component, inject } from '@angular/core';
import { CartItemComponent } from "../../components/cart-item/cart-item.component";
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { ProductCart } from '../../interfaces/product-cart';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, CurrencyPipe, ConfirmDialog, ToastModule, ButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class CartComponent {
  cartService = inject(CartService);
  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);
  cartItems: ProductCart[] = [] as ProductCart[]


  ngOnInit() {
    this.cartItems = this.cartService.getItems();

    console.log(this.cartItems);

  }

  deleteItem(productId: number): void {
    this.cartService.clearItem(productId);
  }

  incrementItem(productId: number) {
    this.cartService.incrementQuantity(productId);
  }

  decrementItem(productId: number) {
    this.cartService.decrementQuantity(productId);
  }

  confirmBuy(event: Event) {
    if (this.cartService.totalItems() === 0) {

      this.messageService.add({ severity: 'warn', summary: 'Carrinho', detail: 'Seu carrinho está vazio!', life: 3000 });
    } else {

      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Deseja realizar a compra?',
        header: 'Confirmação',
        closable: true,
        closeOnEscape: true,
        icon: 'pi pi-exclamation-triangle',
        rejectButtonProps: {
          label: 'Não',
          severity: 'secondary',
          outlined: true,
        },
        acceptButtonProps: {
          label: 'Sim',
        },
        accept: () => {
          this.messageService.add({ severity: 'success', summary: 'Confirmada', detail: 'Compra realizada!' });
          this.cartService.clearCart();
        },
        reject: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Info',
            detail: 'Compra cancelada!',
            life: 3000,
          });
        },
      });
    }
  }
}
