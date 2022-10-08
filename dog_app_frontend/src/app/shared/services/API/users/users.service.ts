import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, Subscription } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  readonly BASE_USERS_URL = environment.usersBaseUrl;
  readonly BASE_API_URL = environment.baseUrl;
  subject = new Subject<boolean>();
  accountDataSubject = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  public updateUserAccount(formData: any): Observable<any> {
    const url = `${this.BASE_USERS_URL}/update`;
    return this.http.post(url, formData);
  }

  public changePassword(formData: any): Observable<any> {
    const url = `${this.BASE_API_URL}/changePassword`;
    return this.http.post(url, formData);
  }

  public getUserDetails(userId: number): Observable<any> {
    const url = `${this.BASE_USERS_URL}/userDetails`;
    return this.http.get(url, {
      params: {
        userId: userId,
      },
    });
  }

  public getAccountDetails(): Observable<any> {
    const url = `${this.BASE_USERS_URL}/accountDetails`;
    return this.http.get(url);
  }

  public getUserComments(
    userId: number,
    urlWithPagination?: string
  ): Observable<any> {
    if (urlWithPagination) {
      return this.http.get(urlWithPagination);
    }

    const url = `${this.BASE_USERS_URL}/comments`;
    return this.http.get(url, {
      params: {
        userId: userId,
      },
    });
  }

  public triggerDataReload(): void {
    this.subject.next(true);
  }

  public triggerAccountDataReload(): void {
    this.accountDataSubject.next(true);
  }

  public getAccountDataSubject(): Subject<boolean> {
    return this.accountDataSubject;
  }
}
