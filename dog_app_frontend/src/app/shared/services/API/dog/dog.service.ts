import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { DogProfile } from '../../../models/dogs/DogProfile';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DogService {
  private dogProfileBaseUrl = environment.dogProfileBaseUrl;
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getUserDogProfiles(): Observable<DogProfile[]> {
    const url = `${this.dogProfileBaseUrl}/user-dog-profiles`;
    return this.http.get<DogProfile[]>(url);
  }

  getDogProfileDetails(dogProfileId: number): Observable<any> {
    const url = `${this.baseUrl}/dogDetails`;
    return this.http.get(url, {
      params: {
        dogProfileId,
      },
    });
  }

  //return dog profile info
  getDogProfiles(searchUrl?: string, filters?: any): Observable<any> {
    if (!searchUrl) {
      return this.http.get(this.dogProfileBaseUrl);
    }

    if (!filters) {
      return this.http.get(searchUrl);
    }

    const urlWithFilters = this.getFiltersUrl(filters);

    console.log('URL WITH FILTERS = ', urlWithFilters);
    return this.http.get(urlWithFilters);
  }

  getDogProfileFilters() {
    const url = `${this.baseUrl}/getDogProfileFilters`;
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

    return `${this.dogProfileBaseUrl}?${filterUrl}`.slice(0, -1);
  }
}
