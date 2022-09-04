import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogCareComponent } from './dog-care.component';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '../../../core/core.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabViewModule } from 'primeng/tabview';
import { TabMenuModule } from 'primeng/tabmenu';
import { PropositionViewComponent } from './proposition-view/proposition-view.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { UpcomingCareComponent } from './upcoming-care/upcoming-care.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ProposalDetailsDialogComponent } from './proposal-details-dialog/proposal-details-dialog.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RateCareDialogComponent } from './rate-care-dialog/rate-care-dialog.component';
import { RatingModule } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DogCareUserViewComponent } from './dog-care-user-view/dog-care-user-view.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin,
]);

const routes: Routes = [
  {
    path: '',
    component: DogCareComponent,
    /*   children: [
      { path: 'opiekun', component: GuardianCareComponent },
      { path: 'wlasciciel', component: OwnerCareComponent },
    ],*/
  },
];

@NgModule({
  declarations: [
    DogCareComponent,
    PropositionViewComponent,
    UpcomingCareComponent,
    CalendarComponent,
    ProposalDetailsDialogComponent,
    RateCareDialogComponent,
    DogCareUserViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreModule,
    ProgressSpinnerModule,
    TabViewModule,
    TabMenuModule,
    FullCalendarModule,
    FullCalendarModule,
    InputTextareaModule,
    RatingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DogCareModule {}
