import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import plLocale from '@fullcalendar/core/locales/pl';
import { DogCare } from '../../../../shared/models/dog-care/DogCare';
import {
  DogCarePropositionViewType,
  DogCareUserType,
} from '../../../../shared/enums/dog-care-enums';
import { DogCareService } from '../../../../shared/services/API/dog-care/dog-care.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnChanges {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  @Input() data: DogCare[];
  @Input() userType: DogCareUserType;
  @Input() careType: DogCarePropositionViewType;

  events: CalendarEvent[];

  options: any;

  header: any;

  constructor(private dogCareService: DogCareService) {}

  ngOnInit(): void {
    this.initEvents();

    this.options = {
      headerToolbar: {
        left: 'title',
        center: '',
        right: 'prev,next today',
      },
      locale: plLocale,
      editable: true,
      selectable: true,
      eventClick: this.handleDateClick.bind(this),
      selectMirror: true,
      dayMaxEvents: true,
      contentHeight: 600,

      events: this.events,
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initEvents();
    if (this.calendarComponent) {
      this.calendarComponent.getApi().removeAllEvents();
      this.calendarComponent.getApi().addEventSource(this.events);
      this.calendarComponent.getApi().render();
    }
  }

  private initEvents(): void {
    const events: CalendarEvent[] = [];
    this.data.forEach(dogCare => {
      events.push(this.createEventFromDogCare(dogCare));
    });
    this.events = events;
  }

  private createEventFromDogCare(dogCare: DogCare): CalendarEvent {
    return {
      id: dogCare.id.toString(),
      title: this.userType === 1 ? dogCare.guardian.name : dogCare.owner.name,
      start: dogCare.start_date,
      end: dogCare.end_date,
    };
  }

  private handleDateClick(arg: any): void {
    const eventId = Number(arg.event.id);
    if (!eventId) return;
    const dogCare = this.data.find(dogCare => dogCare.id === eventId);
    if (!dogCare) return;
    this.dogCareService.openDetailsDialog(
      dogCare,
      this.userType,
      this.careType
    );
  }
}

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
}
