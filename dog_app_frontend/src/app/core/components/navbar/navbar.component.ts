import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  items: MenuItem[];
  showDropdown: boolean = false;
  showHamburgerDropdown: boolean = false;
  isSignedIn: boolean = false;
  headerTitle: string;
  activeUrl: string;

  constructor(
    private authStateService: AuthStateService,
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        const url = event.url;
        console.log('URL = ', url);
        if (url === '/dashboard') {
          this.headerTitle = 'Poszukują Opieki';
        } else if (url.includes('/announcements')) {
          this.headerTitle = 'Ogłoszenia';
        } else if (url.includes('/opieka')) {
          this.headerTitle = 'Propozycje opieki';
        }
      }
    });
    this.isSignedIn = this.authStateService.isLoggedIn();
  }

  logout() {
    this.tokenService.removeToken();
    this.authStateService.removeAuthState();
    this.authStateService.userAuthState.subscribe(state => {
      if (state.authenticated) {
        this.authService.logout();
      }
    });
    location.reload();
  }
}
