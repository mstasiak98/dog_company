import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementDashboardComponent } from './announcement-dashboard/announcement-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '../../../core/core.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { PaginatorModule } from 'primeng/paginator';
import { AnnouncementDetailsComponent } from './announcement-details/announcement-details.component';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';

const routes: Routes = [
  { path: '', component: AnnouncementDashboardComponent },
  { path: 'details/:id', component: AnnouncementDetailsComponent },
];

@NgModule({
  declarations: [AnnouncementDashboardComponent, AnnouncementDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    MultiSelectModule,
    CheckboxModule,
    AutoCompleteModule,
    CalendarModule,
    DividerModule,
    PaginatorModule,
    InputTextModule,
    CardModule,
    RippleModule,
    TooltipModule,
  ],
})
export class AnnouncementModule {}
