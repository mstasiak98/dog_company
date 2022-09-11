import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthStateService } from '../../auth-state/auth-state.service';
import { environment } from '../../../../../environments/environment';
import {
  DogCarePropositionViewType,
  DogCareUserType,
} from '../../../enums/dog-care-enums';
import { ProposalDetailsDialogComponent } from '../../../../modules/client-panel/dog-care/proposal-details-dialog/proposal-details-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { DogCare } from '../../../models/dog-care/DogCare';

@Injectable({
  providedIn: 'root',
})
export class DogCareService {
  authUserId: number;
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
    const url = `${environment.baseUrl}/dogCares`;

    if (urlWithFilters) {
      return this.http.get(urlWithFilters);
    }

    console.log('USER TYPE = ', userType);
    console.log('TYPE =', type);

    return this.http.get(url, {
      params: {
        care_state_id: type,
        user_id: this.authUserId,
        is_owner: userType,
      },
    });
  }

  public openDetailsDialog(dogCare: DogCare, userType: DogCareUserType) {
    const ref = this.dialogService.open(ProposalDetailsDialogComponent, {
      width: '50rem',
      height: '60rem',
      data: {
        dogCare: dogCare,
        userType: userType,
      },
    });

    ref.onClose.subscribe(response => {
      console.log('response = ', response);
    });
  }
}
