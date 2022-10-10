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
import { AnnouncementCreateComponent } from './announcement-create/announcement-create.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AnnouncementListUserComponent } from './announcement-list-user/announcement-list-user.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AuthGuard } from '../../../shared/guards/auth.guard';

const routes: Routes = [
  { path: '', component: AnnouncementDashboardComponent },
  { path: 'detale-ogloszenia/:id', component: AnnouncementDetailsComponent },
  {
    path: 'dodaj-ogloszenie',
    component: AnnouncementCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edytuj-ogloszenie/:id',
    component: AnnouncementCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'moje-ogloszenia',
    component: AnnouncementListUserComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    AnnouncementDashboardComponent,
    AnnouncementDetailsComponent,
    AnnouncementCreateComponent,
    AnnouncementListUserComponent,
  ],
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
    RadioButtonModule,
    ConfirmDialogModule,
  ],
})
export class AnnouncementModule {}
