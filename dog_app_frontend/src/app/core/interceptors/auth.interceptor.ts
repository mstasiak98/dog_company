import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { TokenService } from '../../shared/services/token/token.service';
import { Router } from '@angular/router';
import { AuthStateService } from '../../shared/services/auth-state/auth-state.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private authStateService: AuthStateService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const accessToken = this.tokenService.getToken();
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + accessToken,
        Accept: 'application/json',
      },
    });

    return next
      .handle(req)
      .pipe(catchError(x => this.handleUnauthorizedError(x)))
      .pipe(catchError(x => this.handleForbiddenError(x)))
      .pipe(catchError(x => this.handleNotFoundError(x)));
  }

  private handleForbiddenError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 403) {
      this.router.navigateByUrl(`/brak-autoryzacji`);

      return of(err.message);
    }
    return throwError(() => err);
  }

  private handleNotFoundError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 404) {
      this.router.navigateByUrl(`/nie-znaleziono`);
      return of(err.message);
    }
    return throwError(() => err);
  }

  private handleUnauthorizedError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 && err?.error?.email_not_verified) {
      this.router.navigateByUrl(`/weryfikacja-email`);
      return of(err.message);
    } else if (err.status === 401) {
      this.authStateService.handleLogout();
      return of(err.message);
    }
    return throwError(() => err);
  }
}
