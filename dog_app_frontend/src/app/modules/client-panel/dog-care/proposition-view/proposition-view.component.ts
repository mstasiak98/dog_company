import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import plLocale from '@fullcalendar/core/locales/pl';
import { DialogService } from 'primeng/dynamicdialog';
import { ProposalDetailsDialogComponent } from '../proposal-details-dialog/proposal-details-dialog.component';
@Component({
  selector: 'app-proposition-view',
  templateUrl: './proposition-view.component.html',
  styleUrls: ['./proposition-view.component.scss'],
})
export class PropositionViewComponent implements OnInit, OnDestroy {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  //TODO: replace any with enum
  @Input() type: any;

  events: any[];

  options: any;

  header: any;

  constructor(public dialogService: DialogService) {}

  ngOnInit(): void {
    console.log('init');

    this.options = {
      headerToolbar: {
        left: 'title',
        center: '',
        right: 'prev,next today',
      },
      locale: plLocale,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
    };
  }

  ngOnDestroy(): void {
    console.log('destroy');
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
