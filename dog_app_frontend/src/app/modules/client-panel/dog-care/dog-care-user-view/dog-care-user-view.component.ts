import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  DogCarePropositionViewType,
  DogCareUserType,
} from '../../../../shared/enums/dog-care-enums';
import { DogCareService } from '../../../../shared/services/API/dog-care/dog-care.service';
import { DogCare } from '../../../../shared/models/dog-care/DogCare';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dog-care-user-view',
  templateUrl: './dog-care-user-view.component.html',
  styleUrls: ['./dog-care-user-view.component.scss'],
})
export class DogCareUserViewComponent implements OnInit, OnDestroy {
  @Input() userType: DogCareUserType;
  careTypes = DogCarePropositionViewType;
  incomingDogCares: DogCare[] = [];
  triggerSubscription: Subscription;

  constructor(private dogCareService: DogCareService) {}

  ngOnInit(): void {
    this.getIncomingCares();
    this.listenOnDataReloadTrigger();
  }

  ngOnDestroy(): void {
    this.triggerSubscription.unsubscribe();
  }

  private getIncomingCares(): void {
    this.dogCareService
      .getDogCares(this.userType, DogCarePropositionViewType.OWNER_ACCEPTED)
      .subscribe((res: any) => {
        this.incomingDogCares = res.data;
      });
  }

  private listenOnDataReloadTrigger() {
    this.triggerSubscription = this.dogCareService.subject.subscribe(() => {
      this.getIncomingCares();
    });
  }
}
