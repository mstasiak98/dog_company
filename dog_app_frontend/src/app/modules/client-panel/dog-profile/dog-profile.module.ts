import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogProfileComponent } from './dog-profile/dog-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '../../../core/core.module';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { ImageModule } from 'primeng/image';
import { CheckboxModule } from 'primeng/checkbox';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { UserDogProfileListComponent } from './user-dog-profile-list/user-dog-profile-list.component';
import { DogProfilesDashboardComponent } from './dog-profiles-dashboard/dog-profiles-dashboard.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';

const routes: Routes = [
  { path: '', redirectTo: 'dog-profiles', pathMatch: 'full' },
  { path: 'dog-profiles', component: DogProfilesDashboardComponent },
  { path: 'dog-profile/:id', component: DogProfileComponent },
  { path: 'my-dog-profiles', component: UserDogProfileListComponent },
];

@NgModule({
  declarations: [
    DogProfileComponent,
    UserDogProfileListComponent,
    DogProfilesDashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreModule,
    GalleriaModule,
    CarouselModule,
    ImageModule,
    CheckboxModule,
    ProgressSpinnerModule,
    DynamicDialogModule,
    FormsModule,
    RadioButtonModule,
    ReactiveFormsModule,
    CalendarModule,
    InputTextareaModule,
    MultiSelectModule,
    PaginatorModule,
    DividerModule,
    RippleModule,
    TooltipModule,
  ],
  providers: [],
})
export class DogProfileModule {}
