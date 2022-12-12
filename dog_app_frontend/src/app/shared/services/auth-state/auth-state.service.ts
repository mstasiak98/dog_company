import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserState } from '../../models/UserState';
import { User } from '../../models/User';
import { TokenService } from '../token/token.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  userState = new BehaviorSubject({
    authenticated: false,
    user: <User>{ id: -1, name: '', lastname: '', photo: [] },
  });
  userAuthState = this.userState.asObservable();
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {
    const cacheData = this.getAuthState();
    if (cacheData) {
      this.userState.next(JSON.parse(cacheData));
    }
  }

  setAuthState(value: UserState) {
    this.userState.next(value);
    localStorage.setItem('auth_state', JSON.stringify(value));
  }

  getAuthState() {
    return localStorage.getItem('auth_state');
  }

  userId(): number {
    return this.userState.value.user.id;
  }

  getUsername(): string {
    return this.userState.value.user.name;
  }

  isLoggedIn() {
    const state = this.getAuthState();
    if (state) {
      return JSON.parse(state).authenticated;
    }
    return false;
  }

  removeAuthState() {
    localStorage.removeItem('auth_state');
  }

  handleLogout() {
    this.tokenService.removeToken();
    this.removeAuthState();
    this.userAuthState.subscribe(state => {
      if (state.authenticated) {
        this.authService.logout();
      }
    });
    this.router.navigate(['/']);
  }
}
