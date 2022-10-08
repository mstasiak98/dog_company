import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { HttpClient } from '@angular/common/http';
import { AuthStateService } from '../auth-state/auth-state.service';
import { TokenService } from '../token/token.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Message, Thread } from '../../models/messages/messages';
import { DogCareService } from './dog-care/dog-care.service';
window.Pusher = Pusher;

@Injectable({
  providedIn: 'root',
})
export class PusherServiceService {
  readonly PUSHER_API_KEY = environment.PUSHER_API_KEY;
  readonly PUSHER_CLUSTER = environment.PUSHER_CLUSTER;
  readonly BROADCAST_AUTH_URL = environment.broadcastAuthenticationUrl;

  pusher: any;
  channel: any;
  authUserId: number;
  isSignedIn: boolean;

  messageSubject = new Subject<Message>();
  threadSubject = new Subject<Thread>();

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private authStateService: AuthStateService,
    private dog: DogCareService
  ) {
    this.authUserId = this.authStateService.userId();
    this.isSignedIn = this.authStateService.isLoggedIn();
    const accessToken = this.tokenService.getToken();

    if (!this.isSignedIn) return;
    this.pusher = new Pusher(this.PUSHER_API_KEY, {
      cluster: this.PUSHER_CLUSTER,
      authEndpoint: this.BROADCAST_AUTH_URL,
      auth: {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      },
    });

    this.channel = this.pusher.subscribe(`private-users.${this.authUserId}`);
    this.channel.bind('message.received', (data: any) => {
      this.messageSubject.next(data.message);
      this.threadSubject.next(data.thread);
    });
  }

  getMessageSubject() {
    return this.messageSubject;
  }

  getThreadSubject() {
    return this.threadSubject;
  }
}
