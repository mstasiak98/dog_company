import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {mergeMap, Observable} from "rxjs";
import {User} from "../../models/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://127.0.0.1:8000/api'

  constructor(private http: HttpClient) { }

  signIn(user: User):Observable<any>{
    return this.http.post(`${this.url}/login`, user)
  }

  register(formData: any){
    return this.http.post(`${this.url}/register`, formData)
  }

  logout(){
    return this.http.post(`${this.url}/logout`,'');
  }

  test():Observable<any>{
    return this.http.get(`${this.url}/user`);
  }
}
