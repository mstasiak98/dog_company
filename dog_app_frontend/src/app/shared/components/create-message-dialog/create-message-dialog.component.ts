import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, Validators } from '@angular/forms';
import { MessagesService } from '../../services/API/messages/messages.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-create-message-dialog',
  templateUrl: './create-message-dialog.component.html',
  styleUrls: ['./create-message-dialog.component.scss'],
})
export class CreateMessageDialogComponent implements OnInit {
  messageForm: any;
  messageRecipientId: number;
  isSending: boolean = false;
  constructor(
    private config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private formBuilder: FormBuilder,
    private messagesService: MessagesService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.initData();
    this.initForm();
  }

  private initForm(): void {
    this.messageForm = this.formBuilder.group({
      subject: [null, [Validators.required]],
      recipient: [this.messageRecipientId, Validators.required],
      message: [null, [Validators.required]],
    });
  }
  private initData(): void {
    this.messageRecipientId = this.config.data.recipientId;
  }

  sendMessage(): void {
    if (this.messageForm.invalid) return;
    this.isSending = true;
    const formData = this.messageForm.value;
    this.messagesService.createThread(formData).subscribe({
      next: resp => {
        this.toastService.showSuccessMessage('Wiadomość została wysłana');
      },
      error: err => {
        console.log('err = ', err);
        this.toastService.showErrorMessage(
          'Wystąpił błąd poczas wysyłania wiadomości'
        );
        this.isSending = false;
      },
      complete: () => {
        this.isSending = false;
        this.ref.close();
      },
    });
    console.log('message = ', this.messageForm.value);
  }
}
