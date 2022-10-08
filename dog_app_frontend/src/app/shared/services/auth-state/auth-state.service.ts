import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserState } from '../../models/UserState';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  userState = new BehaviorSubject({
    authenticated: false,
    user: <User>{ id: -1, name: '', lastname: '', photo: [] },
  });
  userAuthState = this.userState.asObservable();
  constructor() {
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
}
