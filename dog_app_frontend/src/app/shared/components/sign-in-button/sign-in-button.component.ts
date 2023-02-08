import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-button',
  templateUrl: './sign-in-button.component.html',
  styleUrls: ['./sign-in-button.component.scss'],
})
export class SignInButtonComponent {
  constructor(private router: Router) {}

  redirectToLogin() {
    this.router.navigate(['/logowanie'], {
      queryParams: { redirectUrl: this.router.routerState.snapshot.url },
    });
  }
}
