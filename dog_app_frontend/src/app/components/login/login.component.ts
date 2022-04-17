import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth/auth.service";
import {TokenService} from "../../shared/services/token/token.service";
import {AuthStateService} from "../../shared/services/auth-state/auth-state.service";
import {UserState} from "../../shared/models/UserState";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errors: any = null;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private authStateService: AuthStateService
  ) {
    this.loginForm = this.fb.group({
      email: [],
      password: [],
    });
  }

  ngOnInit(): void {

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
      console.log('SREDEK HANDLERA');
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
  }
}
