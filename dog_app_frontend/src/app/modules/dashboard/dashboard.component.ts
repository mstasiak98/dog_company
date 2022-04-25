import { Component, OnInit } from '@angular/core';
import {AuthStateService} from "../../shared/services/auth-state/auth-state.service";
import {AuthService} from "../../shared/services/auth/auth.service";
import {TokenService} from "../../shared/services/token/token.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  showLogout:boolean;

  constructor(
    public authStateService: AuthStateService,
    private authService: AuthService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.showLogout = this.authStateService.userState.value.authenticated;
  }

  logout() {
    this.tokenService.removeToken();
    this.authStateService.removeAuthState();
    this.showLogout = false;
    this.authStateService.userAuthState.subscribe(state => {
      if(state.authenticated){
        this.authService.logout();
      }
    })
  }

}
