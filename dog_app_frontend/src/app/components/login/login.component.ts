import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { TokenService } from '../../shared/services/token/token.service';
import { AuthStateService } from '../../shared/services/auth-state/auth-state.service';
import { UserState } from '../../shared/models/UserState';
import { MessageService } from 'primeng/api';
import { ToastService } from '../../shared/services/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  loginForm: any;
  errors: any = null;
  submitted: boolean = false;
  errorMessage: string = 'Niepoprawne dane logowania';
  showErrorMessage: boolean = false;
  redirectUrl: any = '';

  constructor(
    public router: Router,
    public fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private authStateService: AuthStateService,
    private messageService: MessageService,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.redirectUrl =
      this.activatedRoute.snapshot.queryParamMap.get('redirectUrl') ||
      '/aplikacja';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.authService.signIn(this.loginForm.value).subscribe({
      next: result => {
        if (result.success) {
          this.responseHandler(result.data.access_token);
          const userState: UserState = {
            authenticated: true,
            user: result.data.user,
          };
          this.authStateService.setAuthState(userState);
          this.router.navigateByUrl(this.redirectUrl);
        } else {
          this.showErrorMessage = true;
        }
      },
      error: error => {
        this.toastService.showErrorMessage('Wystąpił błąd podczas logowania');
      },
      complete: () => {
        this.loginForm.reset();
      },
    });
  }

  responseHandler(data: any) {
    if (data) {
      this.tokenService.handleData(data);
    }
  }
}
