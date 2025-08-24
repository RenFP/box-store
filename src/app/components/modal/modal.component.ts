import { Component, EventEmitter, inject, Injectable, Input, Output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Product } from '../../interfaces/product';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from '../../services/product.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-modal',
  imports: [Dialog, ButtonModule, InputTextModule, FormsModule, ConfirmDialogModule, ToastModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class ModalComponent {
  productService = inject(ProductService);
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() productChange = new EventEmitter<void>();
  @Input() productData: Product = {} as Product;

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) { }

  value: string = '';


  closeDialog() {
    this.visibleChange.emit(false);
    this.visible = false;
  }

  showDialog() {
    this.visible = !this.visible;
  }


  confirmDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja deletar o produto?',
      header: 'Confirmação',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Deletar',
        severity: 'danger',
      },
      accept: () => {
        this.productService.deleteProduct(this.productData.id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'secondary', summary: 'Deletado', detail: 'Produto deletado com sucesso!' });
            this.closeDialog();
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao deletar o produto.' });
            console.error('Falha ao salvar o produto', err);
          }
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'Operação cancelada!',
          life: 3000,
        });
      },
    });
  }

  confirmSave(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja salvar esse produto?',
      header: 'Confirmação',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Salvar',
        severity: 'success',
      },

      accept: () => {
        this.productService.updateProduct(this.productData.id, this.productData).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Salvo', detail: 'Produto salvo com sucesso!' });
            this.closeDialog();
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao salvar o produto.' });
            console.error('Falha ao excluir o produto', err);
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'Operação cancelada!' });
      },
    });
  }

}
