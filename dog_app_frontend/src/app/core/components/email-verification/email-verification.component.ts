import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
})
export class EmailVerificationComponent implements OnInit {
  emailVerification: boolean = false;
  isLoading: boolean = false;
  invalidToken: boolean = false;
  responseMessage: string = '';
  isVerified: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.token) {
        this.emailVerification = true;
        const token = params.token;
        if (token.length != 64) {
          this.invalidToken = true;
        } else {
          this.isLoading = true;
          this.authService.verifyAccount(token).subscribe({
            next: (resp: any) => {
              if (resp.success) {
                this.isVerified = true;
              }
              this.responseMessage = resp.message;
              this.isLoading = false;
            },
            error: err => {
              this.isLoading = false;
              this.invalidToken = true;
            },
          });
        }
      }
    });
  }
}
