import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthStateService } from '../../../shared/services/auth-state/auth-state.service';
import { TokenService } from '../../../shared/services/token/token.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Route,
  Router,
  RouterEvent,
} from '@angular/router';
import { Event } from '@angular/router';
import { PusherServiceService } from '../../../shared/services/API/pusher-service.service';
import { environment } from '../../../../environments/environment';
import Echo from 'laravel-echo';
import { Subscription } from 'rxjs';
import { MessagesService } from '../../../shared/services/API/messages/messages.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  items: MenuItem[];
  showDropdown: boolean = false;
  showHamburgerDropdown: boolean = false;
  isSignedIn: boolean = false;
  authenticatedUserId: number;
  unreadMessages: string;
  messageSubscription: Subscription;
  threadOpenedSubscription: Subscription;

  constructor(
    private authStateService: AuthStateService,
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private pusherService: PusherServiceService,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    this.isSignedIn = this.authStateService.isLoggedIn();
    this.authenticatedUserId = this.authStateService.userId();
    if (this.isSignedIn) {
      this.getUnreadCount();
      this.listenOnMessageReceived();
      this.listenOnThreadOpenEvent();
    }
  }

  ngOnDestroy() {
    if (this.messageSubscription && this.threadOpenedSubscription) {
      this.messageSubscription.unsubscribe();
      this.threadOpenedSubscription.unsubscribe();
    }
  }

  private listenOnMessageReceived(): void {
    this.messageSubscription = this.pusherService
      .getMessageSubject()
      .subscribe(msg => {
        this.processUnreadMessageCount();
      });
  }

  private listenOnThreadOpenEvent(): void {
    this.threadOpenedSubscription =
      this.messagesService.threadOpenedSubject.subscribe(() => {
        this.getUnreadCount();
      });
  }

  private getUnreadCount(): void {
    this.messagesService.getUnreadCount().subscribe(data => {
      this.unreadMessages = data.count.toString();
    });
  }

  private processUnreadMessageCount(): void {
    this.unreadMessages = (+this.unreadMessages + 1).toString();
  }

  logout(): void {
    this.tokenService.removeToken();
    this.authStateService.removeAuthState();
    this.authStateService.userAuthState.subscribe(state => {
      if (state.authenticated) {
        this.authService.logout();
      }
    });
    this.router.navigate(['/home']);
    /*
    location.reload();
*/
  }
}
