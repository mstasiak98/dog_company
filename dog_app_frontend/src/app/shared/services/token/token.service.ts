import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private issuer = { login: 'http://127.0.0.1:8000/api/login' };

  constructor() {}

  handleData(token: any) {
    console.log('USTAWILEM');
    localStorage.setItem('auth_token', token);
  }

  getToken() {
    return localStorage.getItem('auth_token');
  }

  /*  isValidToken(){
    const token = this.getToken();
    console.log('wzialem token = ', token);
    if(token){
      const payload = this.payload(token);
      console.log('payload po = ',payload);
      if(payload){
        return Object.values(this.issuer).indexOf(payload.iss) > -1;
      }
    }
    return false;
  }

  payload(token: any){
    const jwtPayload = token.split('.')[0];
    console.log('jwtTOKEN PAULOATD = ', jwtPayload);
    console.log('JWT PAYLOAD ATOB', JSON.parse(atob(jwtPayload)));
    return JSON.parse(atob(jwtPayload));

  }

  isLoggedIn(){
    return this.isValidToken();
  }*/

  removeToken() {
    localStorage.removeItem('auth_token');
  }
}
