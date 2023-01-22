import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { DialogService } from 'primeng/dynamicdialog';
import {
  DogCarePropositionViewType,
  DogCareUserType,
} from '../../../../shared/enums/dog-care-enums';
import { DogCareService } from '../../../../shared/services/API/dog-care/dog-care.service';
import { Link } from '../../../../shared/models/pagination/Link';
import { DogCare } from '../../../../shared/models/dog-care/DogCare';
import { RateCareDialogComponent } from '../rate-care-dialog/rate-care-dialog.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-proposition-view',
  templateUrl: './proposition-view.component.html',
  styleUrls: ['./proposition-view.component.scss'],
})
export class PropositionViewComponent implements OnInit, OnDestroy {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  @Input() careType: DogCarePropositionViewType;
  @Input() userType: DogCareUserType;

  dogCarePropositionViewTypes = DogCarePropositionViewType;
  dogCareUserTypes = DogCareUserType;
  dogCares: DogCare[] = [];
  incomingDogCares: DogCare[] = [];

  //PAGINATION
  links: Link[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  caresPerPage: number = 5;

  events: any[];
  options: any;
  header: any;

  //GUI
  isContentLoading: boolean;
  triggerSubscription: Subscription;

  constructor(
    public dialogService: DialogService,
    private dogCareService: DogCareService
  ) {}

  onPageChange(event: any): void {
    const page = event.page + 1;
    const link = this.links.find(link => link.label === page.toString());
    this.dogCareService
      .getDogCares(this.userType, this.careType, link?.url)
      .subscribe(this.processResult());
  }

  ngOnInit(): void {
    this.isContentLoading = true;
    this.initDogCares();
    this.listenOnDataReloadTrigger();
  }

  ngOnDestroy(): void {
    this.triggerSubscription.unsubscribe();
  }

  private listenOnDataReloadTrigger() {
    this.triggerSubscription = this.dogCareService.subject.subscribe(() => {
      this.initDogCares();
    });
  }

  private processResult() {
    return (data: any) => {
      this.dogCares = data.data;
      this.links = data.meta.links;
      this.totalPages = data.meta.total;
      this.currentPage = data.meta.current_page;
      this.caresPerPage = data.meta.per_page;
      this.isContentLoading = false;
    };
  }

  private initDogCares(): void {
    this.dogCareService
      .getDogCares(this.userType, this.careType)
      .subscribe(this.processResult());
  }

  showPropositionDetailsDialog(dogCare: DogCare) {
    this.dogCareService.openDetailsDialog(
      dogCare,
      this.userType,
      this.careType
    );
  }

  showRateCareDialog(dogCare: DogCare) {
    const ref = this.dialogService.open(RateCareDialogComponent, {
      width: '50rem',
      data: {
        dogCare: dogCare,
      },
    });
  }
}
