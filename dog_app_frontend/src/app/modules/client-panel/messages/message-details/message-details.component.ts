import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MessagesService } from '../../../../shared/services/API/messages/messages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from '../../../../shared/models/messages/messages';
import { ToastService } from '../../../../shared/services/toast/toast.service';
import { AuthStateService } from '../../../../shared/services/auth-state/auth-state.service';
import { PusherServiceService } from '../../../../shared/services/API/pusher-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.scss'],
})
export class MessageDetailsComponent
  implements OnInit, OnDestroy, AfterViewChecked
{
  @ViewChildren('messageContainer') container: QueryList<
    ElementRef<HTMLInputElement>
  >;

  isContentLoading: boolean = false;
  threadId: number;
  messages: Message[];
  body: string;
  isMessageSending: boolean = false;
  authenticatedUserId: number;
  messageSubscription: Subscription;

  constructor(
    private messagesService: MessagesService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private authStateService: AuthStateService,
    private pusherService: PusherServiceService
  ) {}

  ngOnInit(): void {
    this.getThreadIdFromRoute();
    this.getMessagesForThread();
    this.authenticatedUserId = this.authStateService.userId();
    this.listenOnMessageReceiveEvent();
  }

  ngAfterViewChecked() {
    this.setScrollToBottom();
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }

  private setScrollToBottom() {
    if (this.container && this.container.first) {
      this.container.first.nativeElement.scrollTop =
        this.container.first.nativeElement.scrollHeight;
    }
  }

  private listenOnMessageReceiveEvent(): void {
    this.messageSubscription = this.pusherService
      .getMessageSubject()
      .subscribe((data: Message) => {
        this.processReceivedMessageEvent(data);
      });
  }

  private processReceivedMessageEvent(message: Message): void {
    this.messages = [...this.messages, message];
    //set message to read
    this.messagesService.getThreadMessages(this.threadId).subscribe(() => {
      this.messagesService.triggerThreadOpenedEvent();
    });
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
        this.emitThreadOpenedEvent();
      },
    };
  }

  private emitThreadOpenedEvent(): void {
    if (this.messages.length <= 0) return;
    this.messagesService.triggerThreadOpenedEvent();
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
  }

  private reply(): void {
    this.messagesService.respondToMessage(this.threadId, this.body).subscribe({
      next: data => {
        this.messages = [...this.messages, data.message];
        this.toastService.showSuccessMessage('Wiadomość została wysłana');
      },
      error: error => {
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
