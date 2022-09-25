import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthStateService } from '../../auth-state/auth-state.service';
import { Observable } from 'rxjs';
import { MakeProposalDialogComponent } from '../../../components/make-proposal-dialog/make-proposal-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateMessageDialogComponent } from '../../../components/create-message-dialog/create-message-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private readonly BASE_MESSAGES_URL = environment.messagesBaseUrl;
  constructor(private http: HttpClient, private dialogService: DialogService) {}

  public getThreads(urlWithParameters?: string): Observable<any> {
    if (urlWithParameters) {
      return this.http.get(urlWithParameters);
    }

    const url = `${this.BASE_MESSAGES_URL}/all`;
    return this.http.get(url);
  }

  public openSendMessageDialog(recipientId: number) {
    const ref = this.dialogService.open(CreateMessageDialogComponent, {
      width: '50rem',
      height: '40rem',
      data: {
        recipientId: recipientId,
      },
    });
  }
}
