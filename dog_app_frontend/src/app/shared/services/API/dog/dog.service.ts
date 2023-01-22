import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { DogProfile } from '../../../models/dogs/DogProfile';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DogService {
  readonly DOG_PROFILE_BASE_URL = environment.dogProfileBaseUrl;
  readonly BASE_URL = environment.baseUrl;

  subject = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  storeDogProfile(data: any, files: File[]): Observable<any> {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));

    files.forEach((file: File) => {
      formData.append('photo[]', file);
    });

    const url = `${this.DOG_PROFILE_BASE_URL}/store`;
    return this.http.post(url, formData);
  }

  changeVisibility(dogProfileId: number, visible: boolean): Observable<any> {
    const url = `${this.DOG_PROFILE_BASE_URL}/changeVisibility`;
    return this.http.patch(url, { id: dogProfileId, visible: visible });
  }

  updateDogProfile(data: any): Observable<any> {
    const url = `${this.DOG_PROFILE_BASE_URL}/update`;
    return this.http.post(url, data);
  }

  deleteDogProfile(dogProfileId: number): Observable<any> {
    const url = `${this.DOG_PROFILE_BASE_URL}/destroy`;
    return this.http.post(url, { id: dogProfileId });
  }

  getUserDogProfiles(): Observable<DogProfile[]> {
    const url = `${this.DOG_PROFILE_BASE_URL}/user-dog-profiles`;
    return this.http.get<DogProfile[]>(url);
  }

  getDogProfileDetails(dogProfileId: number): Observable<any> {
    const url = `${this.BASE_URL}/dogDetails`;
    return this.http.get(url, {
      params: {
        dogProfileId,
      },
    });
  }

  getDogProfileEditData(dogProfileId: number): Observable<any> {
    const url = `${this.DOG_PROFILE_BASE_URL}/edit`;
    return this.http.get(url, {
      params: {
        dogProfileId,
      },
    });
  }

  //return dog profile info
  getDogProfiles(searchUrl?: string, filters?: any): Observable<any> {
    if (!searchUrl) {
      return this.http.get(this.DOG_PROFILE_BASE_URL);
    }

    if (!filters) {
      return this.http.get(searchUrl);
    }

    const urlWithFilters = this.getFiltersUrl(filters);
    return this.http.get(urlWithFilters);
  }

  getDogProfileFilters() {
    const url = `${this.BASE_URL}/getDogProfileFilters`;
    return this.http.get(url);
  }

  private getFiltersUrl(filters: any): string {
    const activities = filters.activity
      ?.map((activity: any) => {
        return `activities[]=${activity.id}`;
      })
      .join('&');

    const features = filters.trait
      ?.map((feature: any) => {
        return `features[]=${feature.id}`;
      })
      .join('&');

    const sizes = filters.size
      ?.map((size: any) => {
        return `sizes[]=${size.id}`;
      })
      .join('&');

    const availabilities = filters.availability
      ?.map((availability: any) => {
        return `availabilities[]=${availability.id}`;
      })
      .join('&');

    const breeds = filters.breed
      ?.map((breed: any) => {
        return `breeds[]=${breed.id}`;
      })
      .join('&');

    let filterUrl = '';

    if (availabilities) {
      filterUrl += availabilities + '&';
    }

    if (sizes) {
      filterUrl += sizes + '&';
    }

    if (features) {
      filterUrl += features + '&';
    }

    if (activities) {
      filterUrl += activities + '&';
    }

    if (breeds) {
      filterUrl += breeds + '&';
    }

    return `${this.DOG_PROFILE_BASE_URL}?${filterUrl}`.slice(0, -1);
  }

  public triggerDataReload(): void {
    this.subject.next(true);
  }

  public getTriggerObservable(): Observable<boolean> {
    return this.subject.asObservable();
  }
}
