import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { DialogService } from 'primeng/dynamicdialog';
import plLocale from '@fullcalendar/core/locales/pl';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  @Input() data: any;

  events: any[];

  options: any;

  header: any;

  constructor() {}

  ngOnInit(): void {
    console.log('TEST DATA = ', this.data);

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
}
