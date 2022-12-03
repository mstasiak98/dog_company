import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { DogCare } from '../../../../shared/models/dog-care/DogCare';
import {
  DogCarePropositionViewType,
  DogCareUserType,
  PropositionAction,
} from '../../../../shared/enums/dog-care-enums';
import { ToastService } from '../../../../shared/services/toast/toast.service';
import { DogCareService } from '../../../../shared/services/API/dog-care/dog-care.service';

@Component({
  selector: 'app-proposal-details-dialog',
  templateUrl: './proposal-details-dialog.component.html',
  styleUrls: ['./proposal-details-dialog.component.scss'],
})
export class ProposalDetailsDialogComponent implements OnInit {
  withSiblings: boolean = true;
  dogCare: DogCare;
  userType: DogCareUserType;
  careType: DogCarePropositionViewType;
  propositionActions = PropositionAction;
  careTypes = DogCarePropositionViewType;
  userTypes = DogCareUserType;
  loading: boolean = false;

  constructor(
    private config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private messageService: MessageService,
    private toastService: ToastService,
    private dogCareService: DogCareService
  ) {}

  ngOnInit(): void {
    this.dogCare = this.config.data.dogCare;
    this.userType = this.config.data.userType;
    this.careType = this.config.data.careType;
  }

  public changePropositionStatus(action: PropositionAction): void {
    this.loading = true;
    this.dogCareService
      .changePropositionStatus(this.dogCare.id, action)
      .subscribe({
        next: res => {
          this.toastService.showSuccessMessage(
            `Propozycja została ${
              action === PropositionAction.ACCEPT
                ? 'zaakceptowana'
                : action === PropositionAction.REJECT
                ? 'odrzucona'
                : 'wycofana'
            }`
          );
          this.loading = false;
          this.dogCareService.triggerCareDataReload();
          this.ref.close();
        },
        error: err => {
          this.toastService.showErrorMessage(err.error.error);
          this.loading = false;
        },
      });
  }
}
