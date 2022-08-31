import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  public showSuccessMessage(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Operacja zakończona powodzeniem',
      detail: message,
    });
  }

  public showErrorMessage(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Wystąpił błąd',
      detail: message,
    });
  }
}
