import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthUser } from '../../models/AuthUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  signIn(user: AuthUser): Observable<any> {
    return this.http.post(`${this.url}/login`, user);
  }

  register(formData: any) {
    return this.http.post(`${this.url}/register`, formData);
  }

  logout() {
    return this.http.post(`${this.url}/logout`, '');
  }

  verifyAccount(token: string) {
    return this.http.get(`${this.url}/account/verify/${token}`);
  }
}
