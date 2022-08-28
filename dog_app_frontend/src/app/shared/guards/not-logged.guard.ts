import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token/token.service';
import { AuthStateService } from '../services/auth-state/auth-state.service';

@Injectable({
  providedIn: 'root',
})
export class NotLoggedGuard implements CanActivate {
  constructor(
    private router: Router,
    private authStateService: AuthStateService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isAuthenticated = this.authStateService.isLoggedIn();

    if (isAuthenticated) {
      this.router.navigate(['']);
    }

    return !isAuthenticated;
  }
}
