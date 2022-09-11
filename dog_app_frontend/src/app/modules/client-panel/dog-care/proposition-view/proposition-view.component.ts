import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import plLocale from '@fullcalendar/core/locales/pl';
import { DialogService } from 'primeng/dynamicdialog';
import { ProposalDetailsDialogComponent } from '../proposal-details-dialog/proposal-details-dialog.component';
import {
  DogCarePropositionViewType,
  DogCareUserType,
} from '../../../../shared/enums/dog-care-enums';
import { DogCareService } from '../../../../shared/services/API/dog-care/dog-care.service';
import { Link } from '../../../../shared/models/pagination/Link';
import { DogCare } from '../../../../shared/models/dog-care/DogCare';
import { RateCareDialogComponent } from '../rate-care-dialog/rate-care-dialog.component';
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

  constructor(
    public dialogService: DialogService,
    private dogCareService: DogCareService
  ) {}

  onPageChange(event: any): void {
    const page = event.page + 1;
    const link = this.links.find(link => link.label === page.toString());
    console.log('link = ', link);
    this.dogCareService
      .getDogCares(this.userType, this.careType, link?.url)
      .subscribe(this.processResult());
  }

  ngOnInit(): void {
    console.log('init prop vieww ', this.careType);
    this.isContentLoading = true;
    this.initDogCares();
    this.getIncomingCares();
    console.log('titak pages = ', this.totalPages);
  }

  ngOnDestroy(): void {
    console.log('destroy prop view');
  }

  private processResult() {
    return (data: any) => {
      console.log('DATA PRZYSZLA = ', data);
      console.log('DATA BYLA = ', this.dogCares);
      this.dogCares = data.data;
      this.links = data.meta.links;
      this.totalPages = data.meta.total;
      this.currentPage = data.meta.current_page;
      this.caresPerPage = data.meta.per_page;
      this.isContentLoading = false;
      console.log('DATA PO ZMIANIE = ', this.dogCares);
    };
  }

  private initDogCares(): void {
    this.dogCareService
      .getDogCares(this.userType, this.careType)
      .subscribe(this.processResult());
  }

  private getIncomingCares(): void {
    this.dogCareService
      .getDogCares(this.userType, DogCarePropositionViewType.OWNER_ACCEPTED)
      .subscribe((res: any) => {
        this.incomingDogCares = res.data;
      });
  }

  showPropositionDetailsDialog(dogCare: DogCare) {
    this.dogCareService.openDetailsDialog(dogCare, this.userType);
  }

  showRateCareDialog(dogCare: DogCare) {
    const ref = this.dialogService.open(RateCareDialogComponent, {
      width: '50rem',
      height: '40rem',
      data: {
        dogCareId: dogCare.id,
      },
    });

    ref.onClose.subscribe(response => {
      console.log('response = ', response);
    });
  }
}
