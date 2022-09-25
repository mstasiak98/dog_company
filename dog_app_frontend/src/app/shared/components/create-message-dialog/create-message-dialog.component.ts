import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-message-dialog',
  templateUrl: './create-message-dialog.component.html',
  styleUrls: ['./create-message-dialog.component.scss'],
})
export class CreateMessageDialogComponent implements OnInit {
  messageForm: any;
  messageRecipientId: number;
  constructor(
    private config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initData();
    this.initForm();
  }

  private initForm(): void {
    this.messageForm = this.formBuilder.group({
      subject: [null, [Validators.required]],
      recipient: [this.messageRecipientId, Validators.required],
      body: [null, [Validators.required]],
    });
  }
  private initData(): void {
    this.messageRecipientId = this.config.data.recipientId;
  }

  sendMessage(): void {
    console.log('message = ', this.messageForm.value);
  }
}
