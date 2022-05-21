import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuItem} from "primeng/api";
import {AuthStateService} from "../../../shared/services/auth-state/auth-state.service";
import {TokenService} from "../../../shared/services/token/token.service";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {Route, Router} from "@angular/router";

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
    ) { }

  ngOnInit(): void {
    this.isSignedIn = this.authStateService.isLoggedIn();
    this.activeUrl = this.router.url;
    console.log('AKTYWNY URL = ', this.activeUrl);
    if(this.activeUrl === '/dashboard'){
      this.headerTitle = 'Poszukują Opieki';
    }
  }

  logout() {
    this.tokenService.removeToken();
    this.authStateService.removeAuthState();
    this.isSignedIn = false;
    this.authStateService.userAuthState.subscribe(state => {
      if(state.authenticated){
        this.authService.logout();
      }
    });
    location.reload();
  }
}
