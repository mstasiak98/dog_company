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
@Component({
  selector: 'app-proposition-view',
  templateUrl: './proposition-view.component.html',
  styleUrls: ['./proposition-view.component.scss'],
})
export class PropositionViewComponent implements OnInit, OnDestroy {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  //TODO: replace any with enum
  @Input() careType: DogCarePropositionViewType;
  @Input() userType: DogCareUserType;

  events: any[];

  options: any;

  header: any;

  constructor(
    public dialogService: DialogService,
    private dogCareService: DogCareService
  ) {}

  ngOnInit(): void {
    console.log('init');
    this.initDogCares();
  }

  ngOnDestroy(): void {
    console.log('destroy');
  }

  private initDogCares(): void {
    this.dogCareService
      .getDogCares(this.userType, this.careType)
      .subscribe(res => {
        console.log('cares = ', res);
      });
  }

  private getIncomingCares(): void {
    this.dogCareService
      .getDogCares(this.userType, DogCarePropositionViewType.OWNER_ACCEPTED)
      .subscribe(res => {
        console.log('incoming cares = ', res);
      });
  }

  showPropositionDetailsDialog() {
    const ref = this.dialogService.open(ProposalDetailsDialogComponent, {
      width: '50rem',
      height: '60rem',
      data: {},
    });

    ref.onClose.subscribe(response => {
      console.log('response = ', response);
    });
  }
}
