import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PhotoEndpointsEnum } from '../../../enums/photo-endpoints-enum';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  readonly DOG_PROFILE_BASE_URL = environment.dogProfileBaseUrl;
  readonly BASE_API_URL = environment.baseUrl;
  readonly ANNOUNCEMENT_BASE_URL = environment.announcementsBaseUrl;
  constructor(private http: HttpClient) {}

  public uploadPhoto(
    modelId: number,
    file: File,
    endpoint: PhotoEndpointsEnum
  ): Observable<any> {
    const url = `${this.BASE_API_URL}/${endpoint}/uploadPhoto`;
    const formData = new FormData();
    formData.append('modelId', JSON.stringify(modelId));
    formData.append('photo[]', file);

    return this.http.post(url, formData);
  }

  public announcementChangePhoto(photoId: number, file: File): Observable<any> {
    const url = `${this.ANNOUNCEMENT_BASE_URL}/replacePhoto`;
    const formData = new FormData();
    formData.append('photoId', JSON.stringify(photoId));
    formData.append('photo[]', file);

    return this.http.post(url, formData);
  }

  public deletePhoto(photoId: number): Observable<any> {
    const url = `${this.BASE_API_URL}/deletePhoto`;
    return this.http.post(url, { photoId: photoId });
  }
}
