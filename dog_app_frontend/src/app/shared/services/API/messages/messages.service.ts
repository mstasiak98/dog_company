import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthStateService } from '../../auth-state/auth-state.service';
import { Observable, Subject } from 'rxjs';
import { MakeProposalDialogComponent } from '../../../components/make-proposal-dialog/make-proposal-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateMessageDialogComponent } from '../../../components/create-message-dialog/create-message-dialog.component';
import { CreateThreadModel, Message } from '../../../models/messages/messages';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private readonly BASE_MESSAGES_URL = environment.messagesBaseUrl;
  constructor(private http: HttpClient, private dialogService: DialogService) {}

  threadOpenedSubject = new Subject<boolean>();

  public getThreads(urlWithParameters?: string): Observable<any> {
    if (urlWithParameters) {
      return this.http.get(urlWithParameters);
    }

    const url = `${this.BASE_MESSAGES_URL}/all`;
    return this.http.get(url);
  }

  public getThreadMessages(threadId: number): Observable<Message[]> {
    const url = `${this.BASE_MESSAGES_URL}/show`;
    return this.http.get<Message[]>(url, {
      params: {
        threadId: threadId,
      },
    });
  }

  public respondToMessage(threadId: number, body: string): Observable<any> {
    const url = `${this.BASE_MESSAGES_URL}/update`;
    return this.http.put(url, { threadId: threadId, body: body });
  }

  public createThread(data: CreateThreadModel): Observable<any> {
    const url = `${this.BASE_MESSAGES_URL}/store`;
    return this.http.post(url, {
      subject: data.subject,
      message: data.message,
      recipient: data.recipient,
    });
  }

  public openSendMessageDialog(recipientId: number) {
    const ref = this.dialogService.open(CreateMessageDialogComponent, {
      width: '50rem',
      data: {
        recipientId: recipientId,
      },
    });
  }

  public getUnreadCount() {
    const url = `${this.BASE_MESSAGES_URL}/getUnreadCount`;
    return this.http.get<{ count: number }>(url);
  }

  public triggerThreadOpenedEvent() {
    this.threadOpenedSubject.next(true);
  }
}
