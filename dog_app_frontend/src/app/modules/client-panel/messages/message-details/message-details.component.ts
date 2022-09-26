import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../../../shared/services/API/messages/messages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from '../../../../shared/models/messages/messages';
import { ToastService } from '../../../../shared/services/toast/toast.service';
import { AuthStateService } from '../../../../shared/services/auth-state/auth-state.service';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.scss'],
})
export class MessageDetailsComponent implements OnInit {
  isContentLoading: boolean = false;
  threadId: number;
  messages: Message[];
  body: string;
  isMessageSending: boolean = false;
  authenticatedUserId: number;

  constructor(
    private messagesService: MessagesService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private authStateService: AuthStateService
  ) {}

  ngOnInit(): void {
    this.getThreadIdFromRoute();
    this.getMessagesForThread();
    this.authenticatedUserId = this.authStateService.userId();

    console.log('id = ', this.threadId);
  }

  private getMessagesForThread(): void {
    this.isContentLoading = true;
    this.messagesService
      .getThreadMessages(this.threadId)
      .subscribe(this.processMessages());
  }

  private processMessages() {
    return {
      next: (data: Message[]) => {
        this.messages = data;
      },
      error: () => {
        this.router.navigate(['/messages']);
      },
      complete: () => {
        this.isContentLoading = false;
      },
    };
  }

  private getThreadIdFromRoute(): void {
    this.route.params.subscribe(params => {
      this.threadId = params.id;
    });
  }

  replyMessage(): void {
    if (!this.body || this.body.trim().length <= 0) return;
    this.isMessageSending = true;
    this.reply();
    console.log('body = ', this.body);
  }

  private reply(): void {
    this.messagesService.respondToMessage(this.threadId, this.body).subscribe({
      next: data => {
        console.log('odp = ', data);
        this.toastService.showSuccessMessage('Wiadomość została wysłana');
      },
      error: error => {
        console.log('error = ', error);
        this.isMessageSending = false;
        this.toastService.showErrorMessage(
          'Wystąpił błąd podczas wysyłania wiadomości'
        );
      },
      complete: () => {
        this.body = '';
        this.isMessageSending = false;
      },
    });
  }
}
