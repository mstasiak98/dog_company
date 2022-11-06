import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  readonly ANNOUNCEMENTS_BASE_URL = environment.announcementsBaseUrl;
  readonly BASE_URL = environment.baseUrl;

  subject = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  getAnnouncementList(searchUrl?: string, filters?: any): Observable<any> {
    // page initialization
    if (!searchUrl) {
      return this.http.get(this.ANNOUNCEMENTS_BASE_URL);
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
    const url = `${this.ANNOUNCEMENTS_BASE_URL}/announcementDetails`;
    return this.http.get(url, {
      params: {
        announcementId: announcementId,
      },
    });
  }

  getAnnouncementEditData(announcementId: number): Observable<any> {
    const url = `${this.ANNOUNCEMENTS_BASE_URL}/edit`;
    return this.http.get(url, {
      params: {
        announcementId: announcementId,
      },
    });
  }

  getAnnouncementListForUser(): Observable<any> {
    const url = `${this.ANNOUNCEMENTS_BASE_URL}/user`;
    return this.http.get(url);
  }

  getAvailableActivities(): Observable<any> {
    const url = `${this.BASE_URL}/getActivities`;
    return this.http.get(url);
  }

  storeAnnouncement(data: FormData): Observable<any> {
    const url = `${this.ANNOUNCEMENTS_BASE_URL}/storeAnnouncement`;

    return this.http.post(url, data);
  }

  updateAnnouncement(data: FormData): Observable<any> {
    const url = `${this.ANNOUNCEMENTS_BASE_URL}/updateAnnouncement`;

    return this.http.post(url, data);
  }

  deleteAnnouncement(id: number): Observable<any> {
    const url = `${this.ANNOUNCEMENTS_BASE_URL}/deleteAnnouncement`;

    return this.http.delete(url, { params: { id: id } });
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

    return `${this.ANNOUNCEMENTS_BASE_URL}?${urlWithFilters}`.slice(0, -1);
  }

  private formatDateType(date: Date): string {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
  }

  public triggerDataReload(): void {
    this.subject.next(true);
  }
}
