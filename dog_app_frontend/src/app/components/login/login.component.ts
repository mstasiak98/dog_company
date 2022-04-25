import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth/auth.service";
import {TokenService} from "../../shared/services/token/token.service";
import {AuthStateService} from "../../shared/services/auth-state/auth-state.service";
import {UserState} from "../../shared/models/UserState";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  loginForm: any;
  errors: any = null;
  submitted: boolean = false;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private authStateService: AuthStateService,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}
  get f(){
    return this.loginForm.controls;
  }

  onSubmit(){
    console.log(JSON.stringify(this.loginForm.value));
    this.authService.signIn(this.loginForm.value).subscribe({
      next: (result) =>{
        console.log('RESULT', result);
        if(result.success){
          this.responseHandler(result.data.access_token);
          const userState: UserState = {authenticated: true, user: {userId: result.data.user_id, userName: result.data.name}};
          this.authStateService.setAuthState(userState);
          this.router.navigate(['/dashboard']);
        }else{
          this.errors = result.error;
        }
      },
      error: (error) => {},
      complete: () => {
        this.loginForm.reset();
      }
    });
  }

  responseHandler(data: any){
    if(data){
      this.tokenService.handleData(data);
    }
  }

  test(){
    this.authService.test().subscribe({
      next: (res) =>{
        console.log('res', res)
      },
      error: (err) => {
        console.log('ERROR =',err);
      }
    })
    this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
  }
}
