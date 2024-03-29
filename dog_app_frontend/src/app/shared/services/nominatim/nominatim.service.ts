import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AddressParameters } from '../../models/AddressParameters';

@Injectable({
  providedIn: 'root',
})
export class NominatimService {
  readonly BASE_NOMINATIM_URL = environment.nominatimUrl;

  constructor(private http: HttpClient) {}

  addressLookup(req: AddressParameters): Observable<any> {
    const url = `${this.BASE_NOMINATIM_URL}/search?format=json&city=${req.city}&postalcode=${req.postalcode}&street=${req.street}`;
    return this.http.get(url);
  }
}
