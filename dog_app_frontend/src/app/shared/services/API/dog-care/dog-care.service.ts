import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthStateService } from '../../auth-state/auth-state.service';
import { environment } from '../../../../../environments/environment';
import {
  DogCarePropositionViewType,
  DogCareUserType,
  PropositionAction,
} from '../../../enums/dog-care-enums';
import { ProposalDetailsDialogComponent } from '../../../../modules/client-panel/dog-care/proposal-details-dialog/proposal-details-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { DogCare } from '../../../models/dog-care/DogCare';
import { Observable, Subject } from 'rxjs';
import { DogCareRate } from '../../../models/dog-care/DogCareRate';

@Injectable({
  providedIn: 'root',
})
export class DogCareService {
  readonly BASE_DOG_CARES_URL = `${environment.baseUrl}/dogCares`;
  authUserId: number;
  subject = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private authStateService: AuthStateService,
    private dialogService: DialogService
  ) {
    this.authUserId = authStateService.userId();
  }

  public getDogCares(
    userType: DogCareUserType,
    type: DogCarePropositionViewType,
    urlWithFilters?: string
  ) {
    const url = this.BASE_DOG_CARES_URL;

    if (urlWithFilters) {
      return this.http.get(urlWithFilters);
    }

    return this.http.get(url, {
      params: {
        care_state_id: type,
        user_id: this.authUserId,
        is_owner: userType,
      },
    });
  }

  public changePropositionStatus(
    dogCareId: number,
    action: PropositionAction
  ): Observable<any> {
    const url = `${this.BASE_DOG_CARES_URL}/${action}`;
    return this.http.post(url, { dogCareId: dogCareId });
  }

  public rateDogCare(dogCareId: number, data: DogCareRate): Observable<any> {
    const url = `${this.BASE_DOG_CARES_URL}/rate-care`;
    return this.http.post(url, {
      dogCareId: dogCareId,
      rating: data.rating,
      comment: data.comment,
    });
  }

  public triggerCareDataReload(): void {
    this.subject.next(true);
  }

  public openDetailsDialog(
    dogCare: DogCare,
    userType: DogCareUserType,
    careType: DogCarePropositionViewType
  ) {
    const ref = this.dialogService.open(ProposalDetailsDialogComponent, {
      width: '50rem',
      data: {
        dogCare: dogCare,
        userType: userType,
        careType: careType,
      },
    });
  }
}
