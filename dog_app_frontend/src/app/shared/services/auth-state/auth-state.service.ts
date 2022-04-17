import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {UserState} from "../../models/UserState";

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {

  private userState = new BehaviorSubject({authenticated: false, user: {userId: -1, userName:''}})
  userAuthState = this.userState.asObservable();
  constructor() { }

  setAuthState(value: UserState){
    this.userState.next(value);
  }
}
