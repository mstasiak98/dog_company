import { Component, Input, OnInit } from '@angular/core';
import {
  DogCarePropositionViewType,
  DogCareUserType,
} from '../../../../shared/enums/dog-care-enums';
import { AuthStateService } from '../../../../shared/services/auth-state/auth-state.service';
import { DogCareService } from '../../../../shared/services/API/dog-care/dog-care.service';
import { DogCare } from '../../../../shared/models/dog-care/DogCare';
import { createLogErrorHandler } from '@angular/compiler-cli/ngcc/src/execution/tasks/completion';

@Component({
  selector: 'app-dog-care-user-view',
  templateUrl: './dog-care-user-view.component.html',
  styleUrls: ['./dog-care-user-view.component.scss'],
})
export class DogCareUserViewComponent implements OnInit {
  @Input() userType: DogCareUserType;
  careTypes = DogCarePropositionViewType;
  incomingDogCares: DogCare[] = [];

  constructor(private dogCareService: DogCareService) {}

  ngOnInit(): void {
    this.getIncomingCares();
    this.listenOnDataReloadTrigger();
  }

  private getIncomingCares(): void {
    this.dogCareService
      .getDogCares(this.userType, DogCarePropositionViewType.OWNER_ACCEPTED)
      .subscribe((res: any) => {
        this.incomingDogCares = res.data;
        console.log('incm cares = ', this.incomingDogCares);
      });
  }

  private listenOnDataReloadTrigger() {
    this.dogCareService.subject.subscribe(() => {
      console.log('pobrane nowe dane');
      this.getIncomingCares();
    });
  }
}
