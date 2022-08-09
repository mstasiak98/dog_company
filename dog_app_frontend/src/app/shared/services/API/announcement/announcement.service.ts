import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  private announcementsUrl = 'http://127.0.0.1:8000/api/announcements';
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getAnnouncementList(searchUrl?: string, filters?: any): Observable<any> {
    // page initialization
    if (!searchUrl) {
      return this.http.get(this.announcementsUrl);
    }

    // pagination without filters - passed url with query parameters
    if (!filters) {
      return this.http.get(searchUrl);
    }

    const urlWithFilters = this.getUrlWithFilters(filters);

    console.log('URL WITH FILTERS = ', urlWithFilters);

    return this.http.get(urlWithFilters);
  }

  getAnnouncementDetails(announcementId: number): Observable<any> {
    const url = `${this.baseUrl}/announcementDetails`;
    return this.http.get(url, {
      params: {
        announcementId: announcementId,
      },
    });
  }

  getAvailableActivities(): Observable<any> {
    const url = `${this.baseUrl}/getActivities`;
    return this.http.get(url);
  }

  private getUrlWithFilters(filters: any) {
    const activities = filters.activity
      ?.map((activity: any) => {
        return `activities[]=${activity.id}`;
      })
      .join('&');

    const quantity = filters.count
      ?.map((quantity: any) => {
        return `quantities[]=${quantity}`;
      })
      .join('&');

    const city = filters.city ? 'city=' + filters.city : null;
    const startDate = filters.start_date
      ? 'start_date=' + this.formatDateType(filters.start_date)
      : null;
    const endDate = filters.end_date
      ? 'end_date=' + this.formatDateType(filters.end_date)
      : null;

    const filterColumns = [activities, quantity, city, startDate, endDate];
    let urlWithFilters = '';
    filterColumns.forEach(filter => {
      if (filter) {
        urlWithFilters += filter + '&';
      }
    });

    return `${this.announcementsUrl}?${urlWithFilters}`.slice(0, -1);
  }

  private formatDateType(date: Date): string {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
  }
}
