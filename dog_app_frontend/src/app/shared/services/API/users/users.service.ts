import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  readonly BASE_USERS_URL = environment.usersBaseUrl;
  subject = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  public getUserDetails(userId: number): Observable<any> {
    const url = `${this.BASE_USERS_URL}/userDetails`;
    return this.http.get(url, {
      params: {
        userId: userId,
      },
    });
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
}
